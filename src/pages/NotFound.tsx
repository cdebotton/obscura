import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Status } from '../modules/routing';
import { Heading } from '../modules/ui/components/atoms/Heading';
import { Page } from '../modules/ui/components/atoms/Page';

type Props = RouteComponentProps<void>;

export const NotFound: React.SFC<Props> = ({ location }) => (
  <Status code={404}>
    <Page>
      <Heading level={2}>Page not found</Heading>
      <p>
        We couldn't find <code>{location.pathname}</code>
      </p>
    </Page>
  </Status>
);
