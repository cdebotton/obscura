import * as React from 'react';

interface Props {
  id: string;
  label: string;
  error: string | undefined;
  isDirty: boolean;
  isValid: boolean;
  isTouched: boolean;
  value: string;
}

export const Input = ({
  label,
  error,
  isValid,
  isDirty,
  isTouched,
  ...inputProps,
}: React.HTMLProps<HTMLInputElement> & Props) => (
  <span>
    {inputProps.value.trim() !== '' && <label>{label}</label>}
    <input placeholder={label} {...inputProps} />
    {isDirty && isTouched && !isValid && <span>{error}</span>}
  </span>
);
