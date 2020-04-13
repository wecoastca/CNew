import * as React from 'react';

import './Scene.css';

import * as THREE from 'three';
import { connect } from 'react-redux';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
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

    const fbxLoader = new FBXLoader();

    const previousModel = scene.getObjectByName('initModel');
    const vector = new THREE.Vector3();
    const prevModelPosition = previousModel.getWorldPosition(vector);

    const makeCircleModel = (numberOfFlowers) => {
      const geometry = new THREE.CircleGeometry(100 + numberOfFlowers * 10);
      const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
      const circle = new THREE.Mesh(geometry, material);
      circle.scale.set(0.01, 0.01, 0.01);
      circle.position.set(0, 1.5, 0);
      circle.rotation.set(-1.55, 0, 0);
      circle.name = 'circle';
      scene.add(circle);
    };

    makeCircleModel(flowNum);

    const estimateBaseTrajectory = (numberOfFlowers:Number) => {
      const a = 0;
      const K = a / 2 * Math.PI;
      const u = 0;

      const x = Math.abs(K * u * Math.cos(u));
      const y = Math.abs(K * u * Math.sin(u));
    };
    // fbxLoader.load('public/models/5roses/5_roses.fbx',
    //   (e) => {
    //     e.rotation.set(0,0,0);
    //     e.position.set(0,0.5,0);
    //     e.scale.set(0.00001, 0.00001, 0.00001);
    //     scene.add(e);
    //   });


    // for (let i = 0; i < flowNum; i++) {
    //   fbxLoader.load(url,
    //     (e) => {
    //       e.rotation.set(0,0,0);
    //       e.position.set(0+i,0,0);
    //       e.scale.set(0.03, 0.03, 0.03);
    //       scene.add(e);
    //     });
    // }
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
