import * as THREE from 'three';
import { MTLLoader } from './../../node_modules/three/examples/jsm/loaders/MTLLoader';
import { OBJLoader2 } from './../../node_modules/three/examples/jsm/loaders/OBJLoader2';
import { TrackballControls } from './../../node_modules/three/examples/jsm/controls/TrackballControls';
import { OrbitControls } from './../../node_modules/three/examples/jsm/controls/OrbitControls';


export const loadModel = () => {
    let scene = new THREE.Scene();
    scene.background = new THREE.Color('whitesmoke');
    let container = document.getElementById("canvas-id");

    let camera = new THREE.PerspectiveCamera(320, container.clientWidth / container.clientHeight, 1, 1000);

    camera.position.z = 150;

    let light = new THREE.AmbientLight(0x404040);
    scene.add(light);

    let textureLoader = new THREE.TextureLoader();
    let texture = textureLoader.load('public/images/uv_grid_opengl.jpg');

    const planeSize = 100;

    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.magFilter = THREE.NearestFilter;
    const repeats = planeSize / 100;
    texture.repeat.set(repeats, repeats);

    const planeGeo = new THREE.PlaneBufferGeometry(planeSize, planeSize);// Создание 3d модели в виде площадки для размещения модели с заданием ширины и высоты
    const planeMat = new THREE.MeshPhongMaterial({ //придаем площадке отблескивания при прокрутке и задаем дефолтные параметры для настройки материалов
        map: texture,
        side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(planeGeo, planeMat); //Сбор всех параметров геометрии и материалов для соединения в одну модель
    mesh.rotation.x = Math.PI / 4;
    scene.add(mesh); //Добавление на сцену модели площадки

    const skyColor = 0xB1E1FF;
    const groundColor = 0xB97A20;
    const intensity = 1;
    const Hlight = new THREE.HemisphereLight(skyColor, groundColor, intensity);//источник света, базирующийся за сценой с обработкой теней (сверху солнце снизу земля)
    scene.add(Hlight);

    let renderer = new THREE.WebGLRenderer();
    renderer.setSize(container.clientWidth, container.clientHeight);

    container.appendChild(renderer.domElement);

    const objTextureLoader = new THREE.TextureLoader();

    const objTexture = objTextureLoader.load(
        'public/models/example1/boq1_100k01.jpg',
        (texture) => {
            const material = new THREE.MeshBasicMaterial({ map: texture });
        },
        undefined,
        (error) => { console.log('An error happened') }
    );
    const objLoader = new OBJLoader2();

    objLoader.load('public/models/example1/boq1_100k.obj',
        (e) => {
            e.traverse((child) => {
                if (child instanceof THREE.Mesh) { child.material.map = objTexture; }
            })
            scene.add(e);
        },
        (xhr) => { console.log((xhr.loaded / xhr.total * 100) + '% loaded Obj model') },
        (error) => { console.log('An error happened'); }
    );
    
    let controls = new OrbitControls(camera, renderer.domElement);

    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
    animate();

}