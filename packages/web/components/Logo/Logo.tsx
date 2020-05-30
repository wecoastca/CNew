import * as React from "react";
import Icon from "@ant-design/icons";
import LogoPng from "./LogoPng";

import * as styles from "./styles.styl";

const Logo = () => {
  return (
    <div className={styles.logotip}>
      <Icon className="png" component={LogoPng} />
      <span className={styles.brandname}>CONSTRUCTOR</span>
    </div>
  );
};

export default Logo;
