import * as React from 'react';
import './Scene.css';

import { loadModel } from './../../helpers/loadModel.js';

export class Scene extends React.Component {
    componentDidMount() {
        loadModel();
    }
    render(
    ) {
        return <div className="canvas-wrapper" id="canvas-id"></div>;

    }


}