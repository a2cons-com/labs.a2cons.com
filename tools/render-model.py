# Studio render of a CAD export (OBJ) for the site, with Blender:
#   /Applications/Blender.app/Contents/MacOS/Blender -b -P tools/render-model.py -- \
#     "art/Historical Jalousi Window-34.obj" out.png 32 12 -90 180
# args: <in.obj> <out.png> [camera azimuth] [elevation] [rotate X] [rotate Z] (degrees)
# then: magick out.png -trim +repage -bordercolor none -border 40 art/jalousie-render.png
import bpy, sys, math
from mathutils import Vector

argv = sys.argv[sys.argv.index('--') + 1:]
src, out = argv[0], argv[1]
ROT_X = float(argv[4]) if len(argv) > 4 else 90
ROT_Z = float(argv[5]) if len(argv) > 5 else 0
az = math.radians(float(argv[2]) if len(argv) > 2 else 35)
el = math.radians(float(argv[3]) if len(argv) > 3 else 18)

bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.ops.wm.obj_import(filepath=src)
objs = [o for o in bpy.context.scene.objects if o.type == 'MESH']
# Fusion's Y is the window's height: stand it up (Y -> Z).
for o in objs:
    o.rotation_euler[0] += math.radians(ROT_X)
    o.rotation_euler[2] += math.radians(ROT_Z)
bpy.context.view_layer.update()

# Satin aluminum for every part.
mat = bpy.data.materials.new('alu')
mat.use_nodes = True
b = mat.node_tree.nodes['Principled BSDF']
b.inputs['Base Color'].default_value = (0.80, 0.82, 0.84, 1)
b.inputs['Metallic'].default_value = 1.0
b.inputs['Roughness'].default_value = 0.32
for o in objs:
    o.data.materials.clear()
    o.data.materials.append(mat)

# Smooth curved faces but keep sharp bends crisp (no triangle facets).
bpy.ops.object.select_all(action='DESELECT')
for o in objs:
    o.select_set(True)
bpy.context.view_layer.objects.active = objs[0]
try:
    bpy.ops.object.shade_smooth_by_angle(angle=math.radians(35))
except Exception as e:
    print('smooth fallback', e)
    bpy.ops.object.shade_auto_smooth(angle=math.radians(35))

# Bounds of the whole model.
pts = [o.matrix_world @ Vector(c) for o in objs for c in o.bound_box]
lo = Vector((min(p.x for p in pts), min(p.y for p in pts), min(p.z for p in pts)))
hi = Vector((max(p.x for p in pts), max(p.y for p in pts), max(p.z for p in pts)))
center = (lo + hi) / 2
size = (hi - lo).length
print('bounds', lo, hi)

scene = bpy.context.scene
scene.render.engine = 'CYCLES'
scene.cycles.samples = 128
scene.cycles.use_denoising = True
scene.render.film_transparent = True
scene.render.resolution_x, scene.render.resolution_y = 1400, 1400
scene.view_settings.view_transform = 'AgX'

world = bpy.data.worlds.new('w')
scene.world = world
world.use_nodes = True
world.node_tree.nodes['Background'].inputs['Color'].default_value = (0.9, 0.93, 0.92, 1)
world.node_tree.nodes['Background'].inputs['Strength'].default_value = 0.25

def light(name, loc, energy, color=(1, 1, 1), sz=1.0):
    d = bpy.data.lights.new(name, 'AREA')
    d.energy, d.color, d.size = energy, color, sz * size
    o = bpy.data.objects.new(name, d)
    scene.collection.objects.link(o)
    o.location = center + Vector(loc) * size
    o.rotation_euler = (center - o.location).to_track_quat('-Z', 'Y').to_euler()

light('key', (1.2, -1.4, 1.6), 260 * size * size)
light('fill', (-1.6, -0.8, 0.6), 90 * size * size, (0.85, 1.0, 0.92))
light('rim', (-0.5, 1.8, 1.2), 220 * size * size, (0.6, 1.0, 0.75))

cam_d = bpy.data.cameras.new('cam')
cam_d.lens = 70
cam = bpy.data.objects.new('cam', cam_d)
scene.collection.objects.link(cam)
scene.camera = cam
dist = size * 2.3
cam.location = center + Vector((math.sin(az) * math.cos(el), -math.cos(az) * math.cos(el), math.sin(el))) * dist
cam.rotation_euler = (center - cam.location).to_track_quat('-Z', 'Y').to_euler()

scene.render.filepath = out
bpy.ops.render.render(write_still=True)
