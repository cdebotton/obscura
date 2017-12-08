import { rem } from 'polished';
import * as React from 'react';
import styled from 'styled-components';
import { createTypedForm, FormErrors } from '../../modules/forms';
import {
  Input,
  InputContainer,
} from '../../modules/forms/components/molecules/Input';

interface Props {
  className?: string;
  onSubmit: (values: Values) => void;
}

interface Values {
  email: string;
  username: string;
  password: string;
}

const Form = createTypedForm<Values>();

const Layout = styled.form`
  display: grid;
  padding: ${rem(24)};

  grid:
    [row1-start] 'email email' min-content [row1-end]
    [row2-start] 'username password' min-content [row2-end]
    [row3-start] 'save reset' min-content [row3-end]
    / auto auto;

  ${InputContainer}:first-child {
    grid-area: email;
  }

  ${InputContainer}:nth-child(2) {
    grid-area: username;
  }

  ${InputContainer}:nth-child(3) {
    grid-area: password;
  }
`;

export const CreateUserForm = ({ className, onSubmit }: Props) => (
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
    {({
      fields,
      metadata,
      onSubmit: handleSubmit,
      onReset,
      isDirty,
      isSubmitting,
      isValid,
    }) => (
      <Layout className={className} onSubmit={handleSubmit}>
        <Input label="Email" {...fields.email} {...metadata.email} />
        <Input label="Username" {...fields.username} {...metadata.username} />
        <Input label="Password" {...fields.password} {...metadata.password} />
        <button type="submit" disabled={!isDirty || !isValid || isSubmitting}>
          {!isSubmitting ? 'Save' : 'Saving...'}
        </button>
        <button type="reset" onClick={onReset} disabled={!isDirty}>
          Reset
        </button>
      </Layout>
    )}
  </Form>
);
