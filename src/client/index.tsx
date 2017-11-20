import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Root } from '../containers/Root';

const mount = document.getElementById('app');

const render = () => {
  ReactDOM.hydrate(<Root />, mount);
};

render();

if (module.hot) {
  module.hot.accept('../containers/Root', render);
}
