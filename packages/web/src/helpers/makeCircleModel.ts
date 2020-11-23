import * as THREE from 'three';

const makeCircleModel = (numberOfFlowers, scene) => {
  const geometry = new THREE.CircleGeometry(
    10 + numberOfFlowers * 10,
    numberOfFlowers
  );
  const material = new THREE.MeshBasicMaterial({ color: 0x808080 });
  const circle = new THREE.Mesh(geometry, material);
  circle.scale.set(0.01, 0.01, 0.01);
  circle.position.set(0, 0, 0);
  circle.rotation.set(0, 0, 0);
  circle.name = "circle";
  scene.add(circle);
};

export default makeCircleModel;