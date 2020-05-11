import * as React from 'react';
import AxisGridHelper from '../../helpers/axisGridHelper';
import { GUI } from 'dat.gui';

import './Scene.css';

import * as THREE from 'three';
import { connect } from 'react-redux';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { loadModel } from '../../helpers/loadModel.js';
import { FormState } from '../../reducers/formReducer';

type State = {
  scene: THREE.Scene,
  renderer: THREE.WebGLRenderer,
  camera: THREE.PerspectiveCamera,
  prevModelsId: [string?]
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
      prevModelsId: []
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
    const { scene, renderer, camera, prevModelsId } = this.state;

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    const makeCircleModel = (numberOfFlowers) => {
      const geometry = new THREE.CircleGeometry(10 + numberOfFlowers * 10, numberOfFlowers);
      const material = new THREE.MeshBasicMaterial({ color: 0x808080 });
      const circle = new THREE.Mesh(geometry, material);
      circle.scale.set(0.01, 0.01, 0.01);
      circle.position.set(0, 1.5, 0);
      circle.rotation.set(-1.55, 0, 0);
      circle.name = 'circle';
      scene.add(circle);
    };

    const createHelperAxis = (targetVector) => {
      const frameGeometry = new THREE.Geometry();
      frameGeometry.vertices.push(new THREE.Vector3(0, 1.5, 0), targetVector);
      const frame = new THREE.Line(frameGeometry, new THREE.LineBasicMaterial({ color: 'rgb(0,255,0)', linewidth: 2 }));
      scene.add(frame);
    };

    const removePreviousModels = (numberOfFlowers) => {
      if( numberOfFlowers == 0) {
        return null;
      }
      else{
        prevModelsId.map((i)=> {
          const object = scene.getObjectByProperty('uuid', i);
          scene.remove(object);
        });
  
        this.setState({prevModelsId: []});
      }
    }

    const modelingBouquet = (numberOfFlowers:Number, source: string) => {
      const circleModel = scene.getObjectByName('circle');
      const circleModelPosition = circleModel.position;

      const calculateCoordinates = (spiralStep, angle) => ({
        x: (spiralStep / 2 * Math.PI) * angle * Math.cos(angle),
        z: (spiralStep / 2 * Math.PI) * angle * Math.sin(angle),
      });

      const makeAxisGrid = (node, label, units?) => {
        const helper = new AxisGridHelper(node, units);
        gui.add(helper, 'visible').name(label);
      };

      for (let i = 0; i < numberOfFlowers; i++) {
        
        let spiralStep = 0;
      switch (true) {
        case numberOfFlowers < 5:
          spiralStep = 0.05;
          break;
          // @ts-ignore
        case numberOfFlowers in [5, 6, 7]:
          spiralStep = 0.2;
          break;
          // @ts-ignore
        case numberOfFlowers in [8, 9, 10]:
          spiralStep = 0.35;
          break;
          // @ts-ignore
        case numberOfFlowers in [11, 12, 13, 14, 15]:
          spiralStep = 0.5;
          break;
          // @ts-ignore
        case numberOfFlowers > 15:
          spiralStep = 0.6;
          break;
          // @ts-ignore
        default:
          spiralStep = 0.2;
          break;
      }

      const xCoordinate = calculateCoordinates(spiralStep, i * Math.PI / 8).x;
      const zCoordinate = calculateCoordinates(spiralStep, i * Math.PI / 8).z;

        // let modelRotation = calculateRotation(i);
        fbxLoader.load(source,
          (e) => {
            e.name = `${i}`;
            prevModelsId.push(e.uuid);
            // e.position.set(0, 1.5, 0);
            e.position.set(circleModelPosition.x + xCoordinate, circleModelPosition.y, circleModelPosition.z + zCoordinate);
            e.scale.set(0.02, 0.02, 0.02);

            scene.add(e);
          });
      }

      this.setState({prevModelsId: prevModelsId});
    };

    const fbxLoader = new FBXLoader();
    const gui = new GUI();

    removePreviousModels(flowNum);
    makeCircleModel(flowNum);
    modelingBouquet(flowNum, url);

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
