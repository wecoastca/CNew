import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

window.THREE = THREE;

export const loadModel = () => {
  // scene
  const scene = new THREE.Scene();
  window.scene = scene;
  const container = document.getElementById("canvas-id");

  // cameras
  const camera = new THREE.PerspectiveCamera(
    60,
    container.clientWidth / container.clientHeight,
    1,
    1000
  );
  camera.position.set(0, 3, 3);

  // lights
  const light = new THREE.AmbientLight(0x505050);
  scene.add(light);

  const spotLight = new THREE.SpotLight(0xffffff);
  spotLight.angle = Math.PI / 5;
  spotLight.penumbra = 0.2;
  spotLight.position.set(2, 3, 3);
  spotLight.castShadow = true;
  spotLight.shadow.camera.near = 3;
  spotLight.shadow.camera.far = 10;
  spotLight.shadow.mapSize.width = 1024;
  spotLight.shadow.mapSize.height = 1024;

  scene.add(spotLight);

  const dirLight = new THREE.DirectionalLight(0x55505a, 1);
  dirLight.position.set(0, 3, 0);
  dirLight.castShadow = true;
  dirLight.shadow.camera.near = 1;
  dirLight.shadow.camera.far = 10;

  dirLight.shadow.camera.right = 1;
  dirLight.shadow.camera.left = -1;
  dirLight.shadow.camera.top = 1;
  dirLight.shadow.camera.bottom = -1;

  dirLight.shadow.mapSize.width = 1024;
  dirLight.shadow.mapSize.height = 1024;

  scene.add(dirLight);

  // renderer
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.shadowMap.enabled = true;

  container.appendChild(renderer.domElement);

  // controls

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 0,0.5);
  controls.enableDamping = true;
  controls.dampingFactor = 0.25;
  controls.enableZoom = true;
  controls.update();

  // add visual axes
  function loadVisualElementHelper(scene) {
    // ************************** //
    // Create (x,y,z) frame centered in (0,0,0)
    // ************************** //
    const xFrameGeometry = new THREE.Geometry();
    xFrameGeometry.vertices.push(
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(1, 0, 0)
    );
    const yFrameGeometry = new THREE.Geometry();
    yFrameGeometry.vertices.push(
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 1, 0)
    );
    const zFrameGeometry = new THREE.Geometry();
    zFrameGeometry.vertices.push(
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, 1)
    );
    const xFrame = new THREE.Line(
      xFrameGeometry,
      new THREE.LineBasicMaterial({ color: "rgb(255,0,0)", linewidth: 2 })
    );
    const yFrame = new THREE.Line(
      yFrameGeometry,
      new THREE.LineBasicMaterial({ color: "rgb(0,255,0)", linewidth: 2 })
    );
    const zFrame = new THREE.Line(
      zFrameGeometry,
      new THREE.LineBasicMaterial({ color: "rgb(0,0,255)", linewidth: 2 })
    );
    scene.add(xFrame);
    scene.add(yFrame);
    scene.add(zFrame);
    xFrame.castShadow = true;
    yFrame.castShadow = true;
    zFrame.castShadow = true;
  }
  loadVisualElementHelper(scene);

  const globalObject = {
    scene,
    renderer,
    camera,
  };

  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  animate();

  return globalObject;
};
