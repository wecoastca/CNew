import * as React from "react";

class SceneCanvas extends React.Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return <div className="canvas-wrapper" id="canvas-id" />;
  }
}

export default SceneCanvas;
