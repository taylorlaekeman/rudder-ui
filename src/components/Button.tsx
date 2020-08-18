import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

import noop from 'utils/noop';

const StyledButton = styled.button<{
  $area: string;
  $isText: boolean;
  $isStruck: boolean;
  $isUnderlined: boolean;
}>`
  appearance: none;
  background: none;
  border: none;
  border-bottom: solid white 1px;
  cursor: ${({ $isText }) => ($isText ? 'text' : 'pointer')};
  grid-area: ${({ $area }) => $area};
  ${({ theme }) => theme.font.medium};
  ${({ $isStruck, $isUnderlined }) => {
    if ($isStruck && $isUnderlined)
      return 'text-decoration: underline line-through;';
    if ($isStruck) return 'text-decoration: line-through;';
    if ($isUnderlined) return 'text-decoration: underline';
    return '';
  }}

  &:hover {
    text-decoration: ${({ $isStruck }) => $isStruck && 'line-through'} underline;
  }
`;

type propTypes = {
  area?: string;
  children: React.ReactNode;
  isText?: boolean;
  isStruck?: boolean;
  isUnderlined?: boolean;
  onClick?: { (): void };
  type?: 'button' | 'submit';
};

const Button: FunctionComponent<propTypes> = ({
  area = '',
  children,
  isText = false,
  isStruck = false,
  isUnderlined = false,
  onClick = noop,
  type = 'button',
}: propTypes) => (
  <StyledButton
    $area={area}
    $isText={isText}
    $isStruck={isStruck}
    $isUnderlined={isUnderlined}
    onClick={onClick}
    type={type}
  >
    {children}
  </StyledButton>
);

Button.defaultProps = {
  area: '',
  onClick: noop,
  type: 'button',
};

export default Button;
