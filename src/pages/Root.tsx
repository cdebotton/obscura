import * as React from 'react';
import { Route, Switch } from 'react-router';
import { AppShell } from '../components/atoms/AppShell';
import { Home } from '../pages/Home';
import { NotFound } from './NotFound';

export const Root = () => (
  <AppShell>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  </AppShell>
);
