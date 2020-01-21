import * as Three from 'three';

export const loadModel = () => {
    let scene = new Three.Scene();
    let container = document.getElementById("canvas-id");

    let camera = new Three.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);

    let renderer = new Three.WebGLRenderer();
    renderer.setSize(container.clientWidth, container.clientHeight);

    container.appendChild(renderer.domElement);

    let geometry = new Three.BoxGeometry(1, 1, 1);
    let material = new Three.MeshBasicMaterial({ color: 0x00ff00 });

    let cube = new Three.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
    animate();

}