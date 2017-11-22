import gql from 'graphql-tag';
import * as React from 'react';
import { graphql } from 'react-apollo';
import { Heading } from '../components/atoms/Heading';
import { Page } from '../components/atoms/Page';
import { NewUserForm } from '../forms/NewUserForm';

type User = {
  id: number;
  email: string;
  username: string;
};

const CreateNewUserQuery = gql`
  mutation createUser($email: String!, $username: String!, $password: String!) {
    createUser(email: $email, username: $username, password: $password) {
      id
      username
      email
    }
  }
`;

const withCreateNewUser = graphql<User>(CreateNewUserQuery);

const CreateNewUserForm = withCreateNewUser(({ mutate }) => (
  <NewUserForm>
    {({ fields, getState }) => (
      <form
        onSubmit={event => {
          event.preventDefault();
          if (mutate) {
            const { username, email, password } = getState();
            mutate({
              variables: { username, email, password },
            });
          }
        }}
      >
        <input
          type="email"
          placeholder="Email"
          value={fields.email.value}
          onChange={fields.email.onChange}
        />
        <input
          type="text"
          placeholder="Username"
          value={fields.username.value}
          onChange={fields.username.onChange}
        />
        <input
          type="password"
          placeholder="Password"
          value={fields.password.value}
          onChange={fields.password.onChange}
        />
        <button type="submit">Save</button>
      </form>
    )}
  </NewUserForm>
));

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

const withUsers = graphql<Response>(GetUsersQuery);

export const AdminUsers = withUsers(({ data }) => {
  if (!data) {
    return null;
  }

  return (
    <Page>
      <Heading level={2}>Users</Heading>
      <CreateNewUserForm />
      {data.loading && <p>Loading...</p>}
      {data.error && <p>{data.error.message}</p>}
      {data.users && (
        <ul>{data.users.map(user => <li key={user.id}>{user.email}</li>)}</ul>
      )}
    </Page>
  );
});
