import * as React from 'react';

import { Scene } from './../Scene/Scene';
import { InputControl } from './../InputControl/InputControl';
import { GenerateButton } from './../GenerateButton/GenerateButton';

import './Content.css';

export class Content extends React.Component {
    render() {
        return (
            <main className="content-wrapper">
                <Scene />
                <div className="inputs-wrapper">
                    <div className="flowers-number">
                        <p className="suggest-text">
                            1. Enter number of flowers <br />
                            you want to see in bouquete.
                        </p>
                        <InputControl 
                            type = 'NUMERIC'
                            inputDefaultValue = {3}
                            />
                    </div>
                    <div className="flowers-type">
                        <p className="suggest-text">
                            2. Choose <b>main type</b> of flowers <br />
                            you want to see in bouquete.
                        </p>
                        <InputControl
                            type = 'DROPDOWN'
                         />
                    </div>
                    <div className="generate">
                        <p className="suggest-text">
                            3. Press <b>Generate</b> and wait for <br />
                            magic.
                        </p>
                        <GenerateButton />
                    </div>


                </div>
            </main>
        );
    }
}