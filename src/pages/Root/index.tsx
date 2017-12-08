import { Context } from 'koa';
import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';
import { Loadable } from '../../modules/loadable';
import { AppShell } from './components/atoms/Shell';

const AdminLoader = Loadable({
  loader: () => import('../../pages/Admin'),
  loading: () => <p>Loading...</p>,
  modules: ['../../pages/Admin'],
  render({ Admin }, props: RouteComponentProps<Context>) {
    return <Admin {...props} />;
  },
  webpack: () => [require.resolveWeak('../../pages/Admin')],
});

const PublicLoader = Loadable({
  loader: () => import('../../pages/Public'),
  loading: () => <p>Loading...</p>,
  modules: ['../../pages/Public'],
  render({ Public }) {
    return <Public />;
  },
  webpack: () => [require.resolveWeak('../../pages/Public')],
});

export const Root: React.SFC<{}> = () => (
  <AppShell>
    <Switch>
      <Route path="/admin" component={AdminLoader} />
      <Route component={PublicLoader} />
    </Switch>
  </AppShell>
);
