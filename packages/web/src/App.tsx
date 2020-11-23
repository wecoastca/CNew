import * as React from 'react';

import { Header } from './modules/Header/Header';
import { Content } from './modules/Content/Content';

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
