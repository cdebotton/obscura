import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router';
import { Loadable } from '../../modules/loadable';
import { publicTheme } from '../../theme/public';
import { ThemeProvider } from '../../utils/styled-components';

const HomeLoader = Loadable({
  loader: () => import('../Home'),
  loading: () => <p>Loading...</p>,
  render({ Home }, props) {
    return <Home {...props} />;
  },
  webpack: () => [require.resolveWeak('../Home')],
});

const NotFoundLoader = Loadable({
  loader: () => import('../NotFound'),
  loading: () => <p>Loading...</p>,
  render({ NotFound }, props: RouteComponentProps<void>) {
    return <NotFound {...props} />;
  },
  webpack: () => [require.resolveWeak('../NotFound')],
});

export const Public = () => (
  <ThemeProvider theme={publicTheme}>
    <Switch>
      <Route exact path="/" component={HomeLoader} />
      <Route component={NotFoundLoader} />
    </Switch>
  </ThemeProvider>
);
