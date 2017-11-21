import { Context } from 'koa';
import * as React from 'react';
import { Route, RouteComponentProps } from 'react-router';

type Props = {
  children: React.ReactElement<any>;
  code: number;
};

export const Status = ({ children, code }: Props) => (
  <Route
    render={({ staticContext }: RouteComponentProps<Context>) => {
      if (staticContext) {
        staticContext.status = code;
      }

      return children;
    }}
  />
);
