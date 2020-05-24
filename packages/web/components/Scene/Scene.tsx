import * as React from "react";

import "./Scene.css";

import * as THREE from "three";

import { connect } from "react-redux";

import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";

import { loadModel } from "../../helpers/loadModel.js";
import makeCircleModel from "../../helpers/makeCircleModel";

import { FormState } from "../../reducers/formReducer";
import SceneCanvas from "../SceneCanvas/SceneCanvas";

type State = {
  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;
  camera: THREE.PerspectiveCamera;
  prevModelsId: [string?];
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
      stepBetweenFlowers: 0.6, //влияет на скорость закручивания
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
      const { stepBetweenFlowers } = this.state;

      const polarToCortesian = (r: number, theta: number) => {
        return {
          x: r * Math.cos(theta),
          y: r * Math.sin(theta),
        };
      };

      const loader = new STLLoader();

      let theta = 0;
      let a = 0.1; //влияет на увеличение шага спирали
      let b = 0.05; //влияет на скорость увеличения расстояния между моделями
      let radius = 0;

      for (let i = 0; i < numberOfFlowers; i++) {

        let x = polarToCortesian(radius, theta).x;
        let y = polarToCortesian(radius, theta).y;

        theta += stepBetweenFlowers;
        radius = a + b * theta;

        // fbxLoader.load('public/models/rose/untitled.fbx', (model) => {
        //   model.position.set(x, y, 0);
        //   model.scale.set(0.02, 0.02, 0.02);
        //   model.lookAt(new THREE.Vector3(0, 0, 0.5));
        //   scene.add(model);
        // });

        loader.load("public/models/Fantastic Fyyran.stl", (model) => {
          let mesh = new THREE.Mesh(model);
          mesh.position.set(x, y, 0);
          mesh.lookAt(new THREE.Vector3(0, 0, 0.5));
          mesh.scale.set(0.02, 0.02, 0.02);

          scene.add(mesh);
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
