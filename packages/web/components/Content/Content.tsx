import * as React from 'react';

import { Scene } from '../Scene/Scene';
import InputControl from '../InputControl/InputControl';
import GenerateButton from '../GenerateButton/GenerateButton';
import FlowersFormContainer from '../FlowersFormContainer/FlowersFormContainer';


import './Content.css';

export class Content extends React.Component {
  render() {
    return (
      <main className="content-wrapper">
        <Scene />
        <FlowersFormContainer />
      </main>
    );
  }
}
