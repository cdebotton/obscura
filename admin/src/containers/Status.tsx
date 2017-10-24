import React from 'react';
import { Route } from 'react-router';

type Props = {
  code: number;
  children: React.ReactElement<any>;
};

const Status = ({ children, code }: Props) => (
  <Route
    render={({ staticContext }) => {
      if (staticContext) {
        staticContext.status = code;
      }

      return children;
    }}
  />
);

export default Status;
