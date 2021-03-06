import gql from 'graphql-tag';
import * as React from 'react';
import { compose, graphql } from 'react-apollo';
import { Heading } from '../../modules/ui';
import { AdminUsersLayout } from './components/atoms/AdminUsersLayout';
import { CreateUserForm } from './CreateUserForm';

type User = {
  id: number;
  email: string;
  username: string;
};

type Response = {
  users: User[];
};

const GetUsersQuery = gql`
  query GetUsers {
    users {
      id
      email
      username
    }
  }
`;

const CreateNewUserQuery = gql`
  mutation createUser($email: String!, $username: String!, $password: String!) {
    createUser(email: $email, username: $username, password: $password) {
      id
      username
      email
    }
  }
`;

const withUsers = graphql<Response>(GetUsersQuery);
const withCreateNewUser = graphql<User>(CreateNewUserQuery);

export const AdminUsers = compose(withCreateNewUser, withUsers)(
  ({ data, mutate }) => {
    const { loading, error, users } = data!;

    return (
      <AdminUsersLayout>
        <Heading level={2}>Users</Heading>
        <CreateUserForm
          onSubmit={async values => {
            await mutate!({ variables: values });
            data!.refetch();
          }}
        />
        {loading && <p>Loading...</p>}
        {error && <p>{error.message}</p>}
        <div data-grid-area="content">
          {users && (
            <ul>{users.map(user => <li key={user.id}>{user.email}</li>)}</ul>
          )}
        </div>
      </AdminUsersLayout>
    );
  },
);
