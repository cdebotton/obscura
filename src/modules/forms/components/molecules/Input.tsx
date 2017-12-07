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
  position: relative;
  padding: ${rem(10)} 0 ${rem(15)};
`;

const InputLabel = styled.label`
  position: absolute;
  top: 0;
  left: ${rem(6)};
  font-size: ${rem(10)};
  font-weight: 800;
  text-transform: uppercase;
`;

const InputError = styled.span`
  position: absolute;
  bottom: 0;
  left: ${rem(6)};
  color: red;
  font-size: ${rem(10)};
  font-weight: 800;
`;

const InputField = styled.input`
  padding: ${rem(4)} ${rem(6)};
  border: none;
  border-bottom: 1px solid #eee;

  &:focus {
    outline: none;
  }
`;

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
