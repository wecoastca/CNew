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
      const circleModel = scene.getObjectByName("circle");
      const circleModelPosition = circleModel.position;

      const calculateCoordinates = (spiralStep, angle) => ({
        x: (spiralStep / 2) * Math.PI * angle * Math.cos(angle),
        z: (spiralStep / 2) * Math.PI * angle * Math.sin(angle),
      });

      for (let i = 0; i < numberOfFlowers; i++) {
        const xCoordinate = calculateCoordinates(0.2, (i * Math.PI) / 8).x;
        const zCoordinate = calculateCoordinates(0.2, (i * Math.PI) / 8).z;

        fbxLoader.load(source, (e) => {
          e.name = `${i}`;
          prevModelsId.push(e.uuid);

          e.position.set(
            circleModelPosition.x + xCoordinate,
            circleModelPosition.y,
            circleModelPosition.z + zCoordinate
          );
          e.lookAt(centerPlane.position);
          e.scale.set(0.02, 0.02, 0.02);

          scene.add(e);
        });
      }
    };

    const fbxLoader = new FBXLoader();

    var centerPlane = new THREE.Mesh(
      new THREE.SphereGeometry(0.05, 0.05, 0.05),
      new THREE.MeshBasicMaterial({ color: 0xff0000 })
    );
    centerPlane.position.set(0, 0, 0);
    scene.add(centerPlane);

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
