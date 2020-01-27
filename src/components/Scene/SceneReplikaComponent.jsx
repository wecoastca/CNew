import * as React from 'react';
//@ts-ignore
import React3 from 'react-three-renderer';
//@ts-ignore
import perspectiveCamera from 'react-three-renderer/src/lib/Module';
import * as THREE from 'three';
//@ts-ignore
import ObjectModel from 'react-three-renderer-objects';
//@ts-ignore
import {SceneDescriptor} from 'react-three-renderer/src/lib/descriptors/Object/SceneDescriptor';

import './Scene.css';

import './model';
import material from './../../public/models/example1/boq1_100k01.jpg';
import model from './../public/models/example1/boq1_100k.obj';

class SceneReplikaComponent extends React.Component {

    //@ts-ignore
    constructor(props) {
        super(props);
        this.state = {
            scene: {}
        };
    }

    componentDidMount() {
        const { scene } = this.refs;
        this.setState({ scene });
    }
    render(
    ) {
        let container = document.getElementById("canvas-id");

        let width = container.clientWidth;
        let height = container.clientHeight;

        return (<div className="canvas-wrapper" id="canvas-id">
            <React3
                mainCamera="camera"
                width={width}
                height={height}
                alpha={true}
            >
                <SceneDescriptor>
                    <perspectiveCamera
                        key={`perspectiveCamera`}
                        name="camera"
                        fov={75}
                        aspect={width / height}
                        near={0.1}
                        far={1000}
                        position={new THREE.Vector3(0, 0, 25)}
                        lookAt={new THREE.Vector3(0, 0, 0)}
                    />
                    <group name="carGroup">
                        <ObjectModel
                            name="boat"
                            model={model}
                            material={material}
                            scene={this.state.scene}
                            group="carGroup"
                        />
                    </group>
                </SceneDescriptor>
            </React3>
        </div>)
    }
}

