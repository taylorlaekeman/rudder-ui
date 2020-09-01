import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

import noop from 'utils/noop';

const Input: FunctionComponent<propTypes> = ({
  area = '',
  hasError = false,
  isPlain = false,
  isStruck = false,
  label = '',
  onChange = noop,
  onKeyDown = noop,
  placeholder = '',
  type = 'text',
  value = '',
}: propTypes) => (
  <Wrapper $area={area} $hasError={hasError} $isPlain={isPlain}>
    <StyledInput
      $hasError={hasError}
      id={label}
      $isPlain={isPlain}
      $isStruck={isStruck}
      onChange={(event) => onChange(event.target.value)}
      onKeyDown={(event) => onKeyDown(event.keyCode)}
      placeholder={placeholder}
      type={type}
      value={value}
    />
    {label && (
      <Label $hasError={hasError} htmlFor={label}>
        {label}
      </Label>
    )}
  </Wrapper>
);

type propTypes = {
  area?: string;
  hasError?: boolean;
  isPlain?: boolean;
  isStruck?: boolean;
  label?: string;
  onChange?: { (value: string): void };
  onKeyDown?: { (value: number): void };
  placeholder?: string;
  type?: 'text' | 'email';
  value?: string;
};

const Wrapper = styled.div<{
  $area: string;
  $hasError: boolean;
  $isPlain: boolean;
}>`
  align-items: flex-end;
  display: flex;
  flex-direction: column;
  grid-area: ${({ $area }) => $area};
  margin-bottom: 32px;

  ${({ $isPlain }) => $isPlain && 'margin-bottom: 0;'}

  &:focus-within > label {
    color: ${({ $hasError, theme }) =>
      $hasError ? theme.colours.text.error : theme.colours.text.input.focus};
  }
`;

const StyledInput = styled.input<{
  $hasError: boolean;
  $isPlain: boolean;
  $isStruck: boolean;
}>`
  background: none;
  border: none;
  border-bottom: solid
    ${({ $hasError, theme }) =>
      $hasError
        ? theme.colours.border.input.error
        : theme.colours.border.input.normal}
    1px;
  color: ${({ $hasError, theme }) =>
    $hasError
      ? theme.colours.text.input.error
      : theme.colours.text.input.normal};
  border-radius: 0;
  outline: none;
  padding: 8px;
  width: 100%;

  ${({ $isPlain }) => $isPlain && 'border-bottom: none;'}
  ${({ $isStruck }) => $isStruck && 'text-decoration: line-through;'}
  ${({ theme }) => theme.fonts.input};

  &:focus {
    border-bottom: solid
      ${({ $hasError, theme }) =>
        $hasError
          ? theme.colours.border.input.error
          : theme.colours.border.input.focus}
      1px;
    color: ${({ $hasError, theme }) =>
      $hasError
        ? theme.colours.text.input.error
        : theme.colours.text.input.focus};

    ${({ $isPlain }) => $isPlain && 'border-bottom: none;'}
  }

  &::placeholder {
    color: ${({ $hasError, theme }) =>
      $hasError
        ? theme.colours.text.input.error
        : theme.colours.text.input.placeholder};
    font-style: italic;
    opacity: 1;
  }
`;

const Label = styled.label<{ $hasError: boolean }>`
  align-self: end;
  color: ${({ $hasError, theme }) =>
    $hasError
      ? theme.colours.text.label.error
      : theme.colours.text.label.normal};
  display: inline-block;
  font-style: italic;
  padding: 0 8px;
  width: max-content;

  ${({ theme }) => theme.fonts.label}

  &:focus {
    color: ${({ $hasError, theme }) =>
      $hasError
        ? theme.colours.text.label.error
        : theme.colours.text.label.focus};
  }
`;

export const BACKSPACE = 8;

export default Input;
