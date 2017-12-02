import * as React from 'react';

interface Props {
  label: string;
  touched: boolean;
}

export const Input = ({
  label,
  ...inputProps,
}: Props & React.HTMLProps<HTMLInputElement>) => (
  <span>
    <label>{label}</label>
    <input {...inputProps} />
  </span>
);
