import * as React from "react";

import Scene from "../Scene/Scene";
import FlowersFormContainer from "../FlowersFormContainer/FlowersFormContainer";

import "./Content.css";

export const Content = (props) => (
  <main className="content-wrapper">
    <Scene />
    <FlowersFormContainer />
  </main>
);
