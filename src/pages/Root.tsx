import * as React from 'react';
import { Route, Switch } from 'react-router';
import { AppShell } from '../components/atoms/AppShell';
import { Admin } from './Admin';
import { Public } from './Public';

export const Root: React.SFC<{}> = () => (
  <AppShell>
    <Switch>
      <Route path="/admin" component={Admin} />
      <Route component={Public} />
    </Switch>
  </AppShell>
);
