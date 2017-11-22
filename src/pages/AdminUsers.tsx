import gql from 'graphql-tag';
import * as React from 'react';
import { graphql } from 'react-apollo';
import { Heading } from '../components/atoms/Heading';
import { Page } from '../components/atoms/Page';
import { addField, makeForm } from '../containers/form';

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

class NewUserForm {
  @addField() public readonly email: string;
  @addField() public readonly username: string;
  @addField() public readonly password: string;
}

const Form = makeForm(NewUserForm);

const CreateNewUserForm = withCreateNewUser(({ mutate }) => (
  <Form>
    {({ fields }) => (
      <form
        onSubmit={() => {
          if (mutate) {
            mutate({
              variables: {},
            });
          }
        }}
      >
        \
        <input type="text" value={fields.email.value} />
        <input type="text" />
        <input type="password" />
      </form>
    )}
  </Form>
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
    </Page>
  );
});
