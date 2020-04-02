import * as React from 'react';

import './Scene.css';

import * as THREE from 'three';
import { connect } from 'react-redux';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { OBJLoader2 } from 'three/examples/jsm/loaders/OBJLoader2';
import { loadModel } from '../../helpers/loadModel.js';
import { FormState } from '../../reducers/formReducer';

type State = {
  scene: THREE.Scene,
  renderer: THREE.WebGLRenderer,
  camera: THREE.PerspectiveCamera
}
type StoreProps = FormState;
type Props = {}
class Scene extends React.Component <Props & StoreProps, State> {
  constructor(props:Props) {
    super(props);

    this.state = {
      scene: new THREE.Scene(),
      renderer: new THREE.WebGLRenderer(),
      camera: new THREE.PerspectiveCamera(),
    };
  }

  componentDidMount() {
    const threeObj = loadModel();

    this.setState({
      scene: threeObj.scene,
      renderer: threeObj.renderer,
      camera: threeObj.camera,
    });
  }

  gatherBouquet = (flowNum, url) => {
    const { scene, renderer, camera } = this.state;

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    // load model from static folder
    const mtlLoader = new MTLLoader();
    mtlLoader.load(
      'public/models/rose/rose.mtl',
      (materials) => {
        materials.preload();

        const objLoader = new OBJLoader2();

        objLoader.addMaterials(materials, false);
        objLoader.load(
          'public/models/rose/rose.obj',
          (e) => {
            scene.add(e);
          },
          (xhr) => { console.log(`${xhr.loaded / xhr.total * 100}% loaded Obj model`); },
          (error) => { console.log('An error happened'); },
        );
      },
      (xhr) => { console.log(`${xhr.loaded / xhr.total * 100}% loaded materials`); },
      (error) => { console.log('An error happened'); },
    );

    // fetch model from any resource

    console.log(flowNum, url, scene);
    const previousModel = scene.getObjectByName('initModel');
    scene.remove(previousModel);

    animate();
  }

  stateListenToGatherBouquet = () => {
    const { scene } = this.state;
    const { flowNum, source, isSubmited } = this.props;
    if (isSubmited === true) {
      this.gatherBouquet(flowNum, source);
    } else {
      return null;
    }
  }

  render() {
    this.stateListenToGatherBouquet();
    return (<div className="canvas-wrapper" id="canvas-id" />);
  }
}

const mapStateToProps = (state): StoreProps => ({
  flowNum: state.formReducer.flowNum,
  source: state.formReducer.source,
  isSubmited: state.formReducer.isSubmited,
});


export default connect(mapStateToProps)(Scene);
