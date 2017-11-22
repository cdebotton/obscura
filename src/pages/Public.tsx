import * as React from 'react';
import { Route, Switch } from 'react-router';
import { publicTheme } from '../theme/public';
import { ThemeProvider } from '../utils/styled-components';
import { Home } from './Home';
import { NotFound } from './NotFound';

export const Public = () => (
  <ThemeProvider theme={publicTheme}>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  </ThemeProvider>
);
