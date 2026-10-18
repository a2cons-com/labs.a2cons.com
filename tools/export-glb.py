# CAD export (OBJ) -> compact GLB for the in-page 3D viewer:
#   /Applications/Blender.app/Contents/MacOS/Blender -b -P tools/export-glb.py -- \
#     "art/Historical Jalousi Window-34.obj" public/models/jalousie.glb 0.35
# args: <in.obj> <out.glb> [decimate ratio]
# Stands the model up (Fusion's Y is the height), joins the parts, decimates,
# and gives it one satin-aluminum material; the viewer frames it itself.
import bpy, sys, math

argv = sys.argv[sys.argv.index('--') + 1:]
src, out = argv[0], argv[1]
ratio = float(argv[2]) if len(argv) > 2 else 0.35

bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.ops.wm.obj_import(filepath=src)
objs = [o for o in bpy.context.scene.objects if o.type == 'MESH']
# Same turn as tools/render-model.py, on top of the importer's own rotation.
for o in objs:
    o.rotation_euler[0] += math.radians(-90)
    o.rotation_euler[2] += math.radians(180)
bpy.ops.object.select_all(action='DESELECT')
for o in objs:
    o.select_set(True)
bpy.context.view_layer.objects.active = objs[0]
bpy.ops.object.transform_apply(rotation=True)
bpy.ops.object.join()
obj = bpy.context.view_layer.objects.active
bpy.ops.object.origin_set(type='ORIGIN_GEOMETRY', center='BOUNDS')
obj.location = (0, 0, 0)
obj.scale = (0.0254, 0.0254, 0.0254)  # inches -> meters
bpy.ops.object.transform_apply(scale=True, location=True)

m = obj.modifiers.new('dec', 'DECIMATE')
m.ratio = ratio
bpy.ops.object.modifier_apply(modifier='dec')
bpy.ops.object.shade_smooth_by_angle(angle=math.radians(35))

mat = bpy.data.materials.new('aluminum')
mat.use_nodes = True
b = mat.node_tree.nodes['Principled BSDF']
b.inputs['Base Color'].default_value = (0.80, 0.82, 0.84, 1)
b.inputs['Metallic'].default_value = 1.0
b.inputs['Roughness'].default_value = 0.32
obj.data.materials.clear()
obj.data.materials.append(mat)
print('faces', len(obj.data.polygons))

bpy.ops.export_scene.gltf(filepath=out, export_format='GLB', use_selection=False, export_apply=True)
