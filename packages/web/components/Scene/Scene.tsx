import * as React from "react";
import AxisGridHelper from "../../helpers/axisGridHelper";
import { GUI } from "dat.gui";

import "./Scene.css";

import * as THREE from "three";
import { connect } from "react-redux";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { loadModel } from "../../helpers/loadModel.js";
import { FormState } from "../../reducers/formReducer";
import SceneCanvas from "../SceneCanvas/SceneCanvas";

import makeCircleModel from "../../helpers/makeCircleModel";

type State = {
  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;
  camera: THREE.PerspectiveCamera;
  prevModelsId: [string?];
  radius: number;
  turns: number;
  objectsPerTurn: number;
  degrees: number;
  stepBetweenFlowers: number;
};

type StoreProps = FormState;
type Props = {};
class Scene extends React.Component<Props & StoreProps, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      scene: new THREE.Scene(),
      renderer: new THREE.WebGLRenderer(),
      camera: new THREE.PerspectiveCamera(),
      prevModelsId: [],
      radius: 2,
      turns: 3,
      objectsPerTurn: 16,
      degrees: 1.15,
      stepBetweenFlowers: 0.1,
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

  createCenterPivot = () => {
    const { scene } = this.state;
    const centerPivot = new THREE.Mesh(
      new THREE.SphereGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({ color: 0xff0000 })
    );

    centerPivot.position.set(0, 1, 0);
    centerPivot.scale.set(0.05, 0.05, 0.05);

    scene.add(centerPivot);
    return centerPivot;
  };

  gatherBouquet(flowNum, url) {
    const { scene, renderer, camera, prevModelsId } = this.state;

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    const removePreviousModels = (numberOfFlowers) => {
      if (numberOfFlowers == 0) {
        return null;
      } else {
        prevModelsId.map((i) => {
          const object = scene.getObjectByProperty("uuid", i);
          scene.remove(object);
        });
      }
    };

    const modelingBouquet = (numberOfFlowers: Number, source: string) => {
      const {
        radius,
        turns,
        objectsPerTurn,
        degrees,
        stepBetweenFlowers,
      } = this.state;

      const circleModel = scene.getObjectByName("circle");

      const angleStep = (Math.PI * 2) / objectsPerTurn;
      const centerPivot = this.createCenterPivot();

      for (let i = 1; i < numberOfFlowers; i++) {
        fbxLoader.load(source, (e) => {
          e.name = `${i}`;
          prevModelsId.push(e.uuid);

          e.position.set(
            Math.cos(angleStep * i) * radius * i * stepBetweenFlowers,
            0,
            Math.sin(angleStep * i) * radius * i * stepBetweenFlowers
          );

          e.lookAt(0, centerPivot.position.y, centerPivot.position.z);
          e.rotateX(degrees);

          e.scale.set(0.02, 0.02, 0.02);

          scene.add(e);
        });
      }
    };

    const fbxLoader = new FBXLoader();

    removePreviousModels(flowNum);
    makeCircleModel(flowNum, scene);
    modelingBouquet(flowNum, url);

    animate();
  }

  componentDidUpdate() {
    const { isSubmited, flowNum, source } = this.props;

    if (isSubmited === true) {
      this.gatherBouquet(flowNum, source);
    } else {
      return null;
    }
  }

  render() {
    return <SceneCanvas />;
  }
}

const mapStateToProps = (state): StoreProps => ({
  flowNum: state.formReducer.flowNum,
  source: state.formReducer.source,
  isSubmited: state.formReducer.isSubmited,
});

export default connect(mapStateToProps)(Scene);
