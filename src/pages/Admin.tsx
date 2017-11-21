import { Context } from 'koa';
import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';
import { BreadcrumbBar } from '../components/atoms/BreadcrumbBar';
import { Header } from '../components/atoms/Header';
import { Heading } from '../components/atoms/Heading';
import { Outlet } from '../components/atoms/Outlet';
import { Row } from '../components/atoms/Row';
import { Sidebar } from '../components/atoms/Sidebar';
import { AdminLayout } from '../components/layouts/AdminLayout';
import { AdminDashboard } from './AdminDashboard';
import { NotFound } from './NotFound';

type Props = RouteComponentProps<Context>;

export const Admin: React.SFC<Props> = ({ match }) => (
  <AdminLayout>
    <Header>
      <Heading>Admin</Heading>
    </Header>
    <BreadcrumbBar>Breadcrumbs</BreadcrumbBar>
    <Row>
      <Sidebar>Sidebar</Sidebar>
      <Outlet>
        <Switch>
          <Route exact path={match.url} component={AdminDashboard} />
          <Route component={NotFound} />
        </Switch>
      </Outlet>
    </Row>
  </AdminLayout>
);
