import * as React from 'react';
import { Route, Switch } from 'react-router';
import { AppShell } from '../components/atoms/AppShell';
import { Home } from '../pages/Home';
import { Admin } from './Admin';
import { NotFound } from './NotFound';

export const Root: React.SFC<{}> = () => (
  <AppShell>
    <Switch>
      <Route path="/admin" component={Admin} />
      <Route exact path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  </AppShell>
);
