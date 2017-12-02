import * as React from 'react';
import { FormErrors, Touched } from '../../containers/Form';

interface Props {
  id: string;
  label: string;
  errors: FormErrors<any>;
  touched: Touched<any>;
  value: string;
}

export const Input = ({
  label,
  errors,
  touched,
  ...inputProps,
}: React.HTMLProps<HTMLInputElement> & Props) => (
  <span>
    {inputProps.value.trim() !== '' && <label>{label}</label>}
    <input {...inputProps} />
    {touched[inputProps.id] &&
      errors[inputProps.id] && <span>{errors[inputProps.id]}</span>}
  </span>
);
