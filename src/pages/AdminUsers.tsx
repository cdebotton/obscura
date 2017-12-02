import gql from 'graphql-tag';
import * as React from 'react';
import { compose, graphql } from 'react-apollo';
import { Heading } from '../components/atoms/Heading';
import { Page } from '../components/atoms/Page';
import { CreateUserForm } from '../components/organisms/CreateUserForm';

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
const withCreateNewUser = graphql<User>(CreateNewUserQuery, { name: 'user' });

export const AdminUsers = compose(withCreateNewUser, withUsers)(
  ({ data, mutate: _ }) => {
    return (
      <Page>
        <Heading level={2}>Users</Heading>
        <CreateUserForm
          onSubmit={values => {
            console.log(values);
          }}
        />
        {data!.loading && <p>Loading...</p>}
        {data!.error && <p>{data!.error!.message}</p>}
        {data!.users && (
          <ul>
            {data!.users!.map(user => <li key={user.id}>{user.email}</li>)}
          </ul>
        )}
      </Page>
    );
  },
);
