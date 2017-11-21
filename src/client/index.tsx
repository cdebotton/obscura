import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router } from 'react-router';
import { Root } from '../pages/Root';
import { history } from './history';

const mount = document.getElementById('app');

const render = () => {
  ReactDOM.hydrate(
    <Router history={history}>
      <Root />
    </Router>,
    mount,
  );
};

render();

if (module.hot) {
  module.hot.accept('../pages/Root', render);
}
