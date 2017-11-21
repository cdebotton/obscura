import { Context } from 'koa';
import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';
import { AdminDashboard } from './AdminDashboard';
import { NotFound } from './NotFound';

type Props = RouteComponentProps<Context>;

export const Admin: React.SFC<Props> = ({ match }) => (
  <Switch>
    <Route exact path={match.url} component={AdminDashboard} />
    <Route component={NotFound} />
  </Switch>
);
