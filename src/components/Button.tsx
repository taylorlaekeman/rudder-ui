import React from 'react';
import styled from 'styled-components';

import noop from 'utils/noop';

const StyledButton = styled.button<{
  $area: string;
  $isStruck: boolean;
  $isUnderlined: boolean;
}>`
  appearance: none;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colours.text};
  cursor: pointer;
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
    text-decoration: underline;
  }
`;

type propTypes = {
  area?: string;
  children: React.ReactNode;
  isStruck?: boolean;
  isUnderlined?: boolean;
  onClick?: { (): void };
  type?: 'button' | 'submit';
};

const Button: React.FunctionComponent<propTypes> = ({
  area = '',
  children,
  isStruck = false,
  isUnderlined = false,
  onClick = noop,
  type = 'button',
}: propTypes) => (
  <StyledButton
    $area={area}
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
