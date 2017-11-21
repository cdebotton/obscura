import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Heading } from '../components/atoms/Heading';
import { Page } from '../components/atoms/Page';
import { Status } from '../containers/Status';

type Props = RouteComponentProps<void>;

export const NotFound: React.SFC<Props> = ({ location }) => (
  <Status code={404}>
    <Page>
      <Heading>Page not found</Heading>
      <p>
        We couldn't find <code>{location.pathname}</code>
      </p>
    </Page>
  </Status>
);
