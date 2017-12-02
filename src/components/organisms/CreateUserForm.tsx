import * as React from 'react';
import { createTypedForm, FormErrors } from '../../containers/Form';

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
    validate={values => {
      const errors: FormErrors<Values> = {};

      if (values.email.trim() === '') {
        errors.email = 'Email is required';
      }

      if (values.username.trim() === '') {
        errors.username = 'Username is required';
      }

      if (values.password.trim() === '') {
        errors.password = 'Password is required';
      }

      return errors;
    }}
  >
    {({ fields, onSubmit: handleSubmit, onReset, isDirty, isValid }) => (
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" {...fields.email} />
        <input type="username" placeholder="Username" {...fields.username} />
        <input type="password" placeholder="Password" {...fields.password} />
        <button type="submit" disabled={!isDirty || !isValid}>
          Save
        </button>
        <button type="reset" onClick={onReset} disabled={!isDirty}>
          Reset
        </button>
      </form>
    )}
  </Form>
);
