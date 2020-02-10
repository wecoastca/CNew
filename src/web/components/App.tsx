import * as React from "react";

import { Header } from "./Header/Header";
import { Content } from './Content/Content';

export default class App extends React.PureComponent {
  render() {
    return (
      <div>
        <Header />
        <Content />
      </div>
    );
  }
}
