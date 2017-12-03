import { rem } from 'polished';
import * as React from 'react';
import styled from 'styled-components';

interface Props {
  id: string;
  label: string;
  error: string | undefined;
  isDirty: boolean;
  isValid: boolean;
  isTouched: boolean;
  value: string;
}

const InputContainer = styled.div`
  padding: ${rem(10)} ${rem(5)};
`;
const InputLabel = styled.label``;
const InputError = styled.span``;
const InputField = styled.input``;

export const Input = ({
  label,
  error,
  isValid,
  isDirty,
  isTouched,
  ...inputProps,
}: React.HTMLProps<HTMLInputElement> & Props) => (
  <InputContainer>
    {inputProps.value.trim() !== '' && (
      <InputLabel htmlFor={inputProps.id}>{label}</InputLabel>
    )}
    <InputField placeholder={label} {...inputProps as any} />
    {isDirty && isTouched && !isValid && <InputError>{error}</InputError>}
  </InputContainer>
);
