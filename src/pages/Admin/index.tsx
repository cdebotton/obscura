import { Context } from 'koa';
import * as React from 'react';
import { Link, Route, RouteComponentProps, Switch } from 'react-router-dom';
import { AdminLayout } from '../../components/layouts/AdminLayout';
import { Heading } from '../../modules/ui/components/atoms/Heading';
import { adminTheme } from '../../theme/admin';
import { ThemeProvider } from '../../utils/styled-components';
import { AdminDashboard } from '../AdminDashboard';
import { AdminUsers } from '../AdminUsers';
import { NotFound } from '../NotFound';
import { BreadcrumbBar } from './components/atoms/BreadcrumbBar';
import { Header } from './components/atoms/Header';
import { Sidebar } from './components/atoms/Sidebar';

type Props = RouteComponentProps<Context>;

export const Admin: React.SFC<Props> = ({ match }) => (
  <ThemeProvider theme={adminTheme}>
    <AdminLayout>
      <Header>
        <Heading>Obscura</Heading>
      </Header>
      <BreadcrumbBar>
        <Link to={match.path}>Home</Link>
        <Link to={`${match.path}/users`}>Users</Link>
      </BreadcrumbBar>
      <Sidebar />
      <Switch>
        <Route exact path={match.url} component={AdminDashboard} />
        <Route path={`${match.url}/users`} component={AdminUsers} />
        <Route component={NotFound} />
      </Switch>
    </AdminLayout>
  </ThemeProvider>
);
