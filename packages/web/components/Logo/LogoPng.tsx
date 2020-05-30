import * as React from "react";
import logo from "public/images/logo.png";

import * as styles from "./styles.styl";

const LogoPng = () => {
  return <img src={logo} alt="LOGO_CONSTRUCTOR" className={styles.logo} />;
};

export default LogoPng;
