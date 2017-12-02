import * as React from 'react';
import { createTypedForm } from '../../containers/Form';

interface Props {
  onSubmit: (values: Values) => void;
}

interface Values {
  email: string;
  username: string;
  password: string;
}

const Form = createTypedForm<Values>();

export const CreateUserForm = ({ onSubmit }: Props) => (
  <Form
    onSubmit={onSubmit}
    initialValues={{
      email: '',
      password: '',
      username: '',
    }}
  >
    {({ fields, onSubmit: handleSubmit }) => (
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" {...fields.email} />
        <input type="username" placeholder="Username" {...fields.username} />
        <input type="password" placeholder="Password" {...fields.password} />
        <button type="submit">Save</button>
      </form>
    )}
  </Form>
);
