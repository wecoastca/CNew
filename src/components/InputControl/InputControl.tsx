import * as React from 'react';
import './InputControl.css';

export class InputControl extends React.Component {
    render() {
        return (
            <div className="input-control">
                <input type="text" name="input" />
            </div>
        );
    }
}