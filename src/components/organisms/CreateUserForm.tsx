import * as React from 'react';
import { createTypedForm, FormErrors } from '../../containers/Form';
import { Input } from '../molecules/Input';

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
      <form className={className} onSubmit={handleSubmit}>
        <Input label="Email" {...fields.email} {...metadata.email} />
        <Input label="Username" {...fields.username} {...metadata.username} />
        <Input label="Password" {...fields.password} {...metadata.password} />
        <button type="submit" disabled={!isDirty || !isValid || isSubmitting}>
          {!isSubmitting ? 'Save' : 'Saving...'}
        </button>
        <button type="reset" onClick={onReset} disabled={!isDirty}>
          Reset
        </button>
      </form>
    )}
  </Form>
);
