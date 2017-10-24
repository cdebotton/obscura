import React from 'react';
import { Route, Switch } from 'react-router';
import Home from '../routes/Home';
import NotFound from '../routes/NotFound';

const Root = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route component={NotFound} />
  </Switch>
);

export default Root;
