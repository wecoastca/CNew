import * as React from 'react';
import Icon from '@ant-design/icons';
import LogoPng from './LogoPng';

import "./Logo.css";

const Logo = () => {
  return(
    <div className="logo">
      <Icon className="png" component={LogoPng}/>
      <span>CONSTRUCTOR</span>
    </div>
  )
}

export default Logo;