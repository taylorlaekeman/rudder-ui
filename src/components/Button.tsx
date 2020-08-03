import React from 'react';
import styled from 'styled-components';

import noop from 'utils/noop';

const StyledButton = styled.button<{ $area: string; $isUnderlined: boolean }>`
  appearance: none;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colours.text};
  cursor: pointer;
  grid-area: ${({ $area }) => $area};
  ${({ $isUnderlined }) => $isUnderlined && 'text-decoration: underline;'}
  ${({ theme }) => theme.font.medium};

  &:hover {
    text-decoration: underline;
  }
`;

type propTypes = {
  area?: string;
  children: React.ReactNode;
  isUnderlined?: boolean;
  onClick?: { (): void };
  type?: 'button' | 'submit';
};

const Button: React.FunctionComponent<propTypes> = ({
  area = '',
  children,
  isUnderlined = false,
  onClick = noop,
  type = 'button',
}: propTypes) => (
  <StyledButton
    $area={area}
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
