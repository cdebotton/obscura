import gql from 'graphql-tag';
import * as React from 'react';
import { graphql } from 'react-apollo';
import { Heading } from '../components/atoms/Heading';
import { Page } from '../components/atoms/Page';
import { createTypedForm } from '../containers/Form';

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

interface CreateUsersFormValues {
  username: string;
  password: string;
  email: string;
}

const Form = createTypedForm<CreateUsersFormValues>();

const CreateUserForm = withCreateNewUser(() => (
  <Form
    initialValues={{
      email: '',
      password: '',
      username: '',
    }}
  >
    {({ fields }) => (
      <form>
        <input type="email" placeholder="Email" {...fields.email} />
        <input type="username" placeholder="Username" {...fields.username} />
        <input type="password" placeholder="Password" {...fields.password} />
        <button type="submit">Save</button>
      </form>
    )}
  </Form>
));

export const AdminUsers = withUsers(({ data }) => {
  if (!data) {
    return null;
  }

  return (
    <Page>
      <Heading level={2}>Users</Heading>
      <CreateUserForm />
      {data.loading && <p>Loading...</p>}
      {data.error && <p>{data.error.message}</p>}
      {data.users && (
        <ul>{data.users.map(user => <li key={user.id}>{user.email}</li>)}</ul>
      )}
    </Page>
  );
});
