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

    for (let i = 0; i < flowNum; i++) {
      fbxLoader.load(url,
        (e) => {
          const newModelPosition = prevModelPosition.setX(prevModelPosition.x + 10 + i);
          e.position.add(newModelPosition);
          scene.add(e);
        });
    }
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
