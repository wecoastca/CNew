import * as React from 'react';

import './Scene.css';

import * as THREE from 'three';
import { connect } from 'react-redux';
import { loadModel } from '../../helpers/loadModel.js';
import gatherBouquet from '../../helpers/gatherBouquet';
import { FormState } from '../../reducers/formReducer';

type State = {
  scene: THREE.Scene
}
type StoreProps = FormState;
type Props = {}
class Scene extends React.Component <Props & StoreProps, State> {
  constructor(props:Props) {
    super(props);
    this.state = {
      scene: new THREE.Scene(),
    };
  }

  componentDidMount() {
    const initialScene = loadModel();
    this.setState({ scene: initialScene });
  }

  gatherBouquet = (flowNum, url, scene) => {
    console.log(flowNum, url, scene);
  }

  stateListenToGatherBouquet = () => {
    const { scene } = this.state;
    const { flowNum, source, isSubmited } = this.props;
    if (isSubmited === true) {
      gatherBouquet(flowNum, source, scene);
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
