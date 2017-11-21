import * as React from 'react';
import { Route, Switch } from 'react-router';
import { Home } from './Home';
import { NotFound } from './NotFound';

export const Public = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route component={NotFound} />
  </Switch>
);
