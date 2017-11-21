import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Header } from '../components/atoms/Header';
import { Page } from '../components/atoms/Page';
import { Status } from '../containers/Status';

type Props = RouteComponentProps<void>;

export const NotFound = ({ location }: Props) => (
  <Status code={404}>
    <Page>
      <Header>Page not found</Header>
      <p>
        We couldn't find <code>{location.pathname}</code>
      </p>
    </Page>
  </Status>
);
