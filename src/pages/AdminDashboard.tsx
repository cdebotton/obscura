import gql from 'graphql-tag';
import * as React from 'react';
import { graphql } from 'react-apollo';
import { Heading } from '../components/atoms/Heading';
import { Page } from '../components/atoms/Page';

const USERS_QUERY = gql`
  query GetUsers {
    users {
      id
      username
      email
    }
  }
`;

type User = {
  id: number;
  email: string;
  username: string;
};

type Response = {
  users: User[];
};

const withUsers = graphql<Response>(USERS_QUERY);

export const AdminDashboard = withUsers(({ data }) => {
  if (!data) {
    return null;
  }

  const { loading, error, users } = data;

  return (
    <Page>
      <Heading>Admin Dashboard</Heading>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {users && (
        <ul>
          {users.map(user => (
            <li key={user.id}>
              <a href={`mailto:${user.email}`}>{user.username}</a>
            </li>
          ))}
        </ul>
      )}
    </Page>
  );
});
