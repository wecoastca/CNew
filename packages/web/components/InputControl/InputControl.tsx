import * as React from 'react';
import './InputControl.css';

type Props = {handleChange : (event: React.ChangeEvent) => void}

const InputControl = (props:Props) => (
  <div className="input-control">
    <input
      className="input-control_numeric"
      onChange={props.handleChange}
    />
  </div>
);

export default InputControl;
