import React from 'react';
import { hydrate } from 'react-dom';
import { Router } from 'react-router';
import Root from '../containers/Root';
import history from './history';

const mount = document.querySelector('#app');

const render = () => {
  hydrate(
    <Router history={history}>
      <Root />
    </Router>,
    mount,
  );
};

render();

if (module.hot) {
  module.hot.accept('../containers/Root', render);
}
