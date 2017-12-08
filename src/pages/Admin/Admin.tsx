import { Context } from 'koa';
import * as React from 'react';
import { Link, Route, RouteComponentProps, Switch } from 'react-router-dom';
import { Loadable } from '../../modules/loadable';
import { Heading } from '../../modules/ui/components/atoms/Heading';
import { adminTheme } from '../../theme/admin';
import { ThemeProvider } from '../../utils/styled-components';
import { AdminLayout } from './components/atoms/AdminLayout';
import { BreadcrumbBar } from './components/atoms/BreadcrumbBar';
import { Header } from './components/atoms/Header';
import { Sidebar } from './components/atoms/Sidebar';

const AdminDashboardLoader = Loadable({
  loader: () => import('../../pages/AdminDashboard'),
  loading: () => <p>Loading...</p>,
  modules: ['../../pages/AdminDashboard'],
  render({ AdminDashboard }) {
    return <AdminDashboard />;
  },
  webpack: () => [require.resolveWeak('../../pages/AdminDashboard')],
});

const AdminUsersLoader = Loadable({
  loader: () => import('../../pages/AdminUsers'),
  loading: () => <p>Loading...</p>,
  modules: ['../../pages/AdminUsers'],
  render({ AdminUsers }) {
    return <AdminUsers />;
  },
  webpack: () => [require.resolveWeak('../../pages/AdminUsers')],
});

const NotFoundLoader = Loadable({
  loader: () => import('../../pages/NotFound'),
  loading: () => <p>Loading...</p>,
  modules: ['../../pages/NotFound'],
  render({ NotFound }, props: RouteComponentProps<void>) {
    return <NotFound {...props} />;
  },
  webpack: () => [require.resolveWeak('../../pages/NotFound')],
});

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
        <Route exact path={match.url} component={AdminDashboardLoader} />
        <Route path={`${match.url}/users`} component={AdminUsersLoader} />
        <Route component={NotFoundLoader} />
      </Switch>
    </AdminLayout>
  </ThemeProvider>
);
