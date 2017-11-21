import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import * as ReactDOM from 'react-dom';
import { Router } from 'react-router';
import { Root } from '../pages/Root';
import { history } from './history';

const mount = document.getElementById('app');
const state = (window as any).__APOLLO_STATE__;
const client = new ApolloClient({
  cache: new InMemoryCache().restore(state) as any,
  link: new HttpLink({
    uri: '/graphql',
  }),
});

const render = () => {
  ReactDOM.hydrate(
    <ApolloProvider client={client}>
      <Router history={history}>
        <Root />
      </Router>
    </ApolloProvider>,
    mount,
  );
};

render();

if (module.hot) {
  module.hot.accept('../pages/Root', render);
}
