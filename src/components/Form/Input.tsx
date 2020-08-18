import React from 'react';
import styled from 'styled-components';

import noop from 'utils/noop';

type propTypes = {
  area?: string;
  isStruck?: boolean;
  onChange?: { (value: string): void };
  onKeyDown?: { (value: number): void };
  placeholder?: string;
  value?: string;
};

const Input: React.FunctionComponent<propTypes> = ({
  area = '',
  isStruck = false,
  onChange = noop,
  onKeyDown = noop,
  placeholder = '',
  value = '',
}: propTypes) => (
  <StyledInput
    area={area}
    $isStruck={isStruck}
    onChange={(event) => onChange(event.target.value)}
    onKeyDown={(event) => onKeyDown(event.keyCode)}
    placeholder={placeholder}
    type="text"
    value={value}
  />
);

const StyledInput = styled.input<{ area: string; $isStruck: boolean }>`
  background: none;
  border: none;
  grid-area: ${({ area }) => area};
  outline: none;
  width: 100%;
  ${({ $isStruck }) => $isStruck && 'text-decoration: line-through;'}
  ${({ theme }) => theme.font.medium};

  &::placeholder {
    color: ${({ theme }) => theme.colours.text.placeholder};
    font-style: italic;
    opacity: 1;
  }
`;

export const BACKSPACE = 8;

export default Input;
