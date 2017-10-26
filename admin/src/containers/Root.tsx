import Home from '@routes/Home';
import NotFound from '@routes/NotFound';
import React from 'react';
import { Route, Switch } from 'react-router';

const Root = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route component={NotFound} />
  </Switch>
);

export default Root;
