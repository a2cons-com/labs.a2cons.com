// The 3D view behind ModelViewer.astro, loaded on demand (three.js, like
// A2 Contracts' model viewer): orbit, zoom and pan a GLB under soft studio
// light on a transparent background.
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

export async function show(box: HTMLElement, url: string) {
  const gltf = await new GLTFLoader().loadAsync(url);
  const { clientWidth: w, clientHeight: h } = box;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(w, h);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.domElement.className = 'model-canvas';
  renderer.domElement.setAttribute('aria-label', 'Interactive 3D model: drag to turn, pinch or scroll to zoom');

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

  const model = gltf.scene;
  scene.add(model);
  const bounds = new THREE.Box3().setFromObject(model);
  const size = bounds.getSize(new THREE.Vector3()).length();
  const center = bounds.getCenter(new THREE.Vector3());

  const camera = new THREE.PerspectiveCamera(30, w / h, size / 100, size * 20);
  // glTF is Y-up (Blender's exporter converts): look at the front, a little from the right and above.
  camera.position.copy(center).add(new THREE.Vector3(0.55, 0.22, 1.0).normalize().multiplyScalar(size * 1.9));
  camera.lookAt(center);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.copy(center);
  controls.enableDamping = true;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 1.2;
  controls.addEventListener('start', () => (controls.autoRotate = false));

  box.appendChild(renderer.domElement);
  new ResizeObserver(() => {
    const { clientWidth, clientHeight } = box;
    renderer.setSize(clientWidth, clientHeight);
    camera.aspect = clientWidth / clientHeight;
    camera.updateProjectionMatrix();
  }).observe(box);

  renderer.setAnimationLoop(() => {
    controls.update();
    renderer.render(scene, camera);
  });
}
