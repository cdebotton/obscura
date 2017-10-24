import React from 'react';
import { RouteComponentProps } from 'react-router';
import Status from '../containers/Status';

type Props = RouteComponentProps<any>;

const NotFound = ({ location }: Props) => (
  <Status code={404}>
    <div>
      <h1>Whoops!</h1>
      <p>
        I couldn't find anything for `<code>{location.pathname}</code>`.
      </p>
    </div>
  </Status>
);

export default NotFound;
