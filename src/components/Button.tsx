import React from 'react';
import styled from 'styled-components';

import noop from 'utils/noop';

const StyledButton = styled.button<{ area: string }>`
  appearance: none;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colours.text};
  cursor: pointer;
  font-size: 1.2rem;
  grid-area: ${({ area }) => area};
  padding: 16px;

  &:hover {
    text-decoration: underline;
  }
`;

type propTypes = {
  area?: string;
  children: React.ReactNode;
  onClick?: { (): void };
  type?: 'button' | 'submit';
};

const Button: React.FunctionComponent<propTypes> = ({
  area = '',
  children,
  onClick = noop,
  type = 'button',
}: propTypes) => (
  <StyledButton area={area} type={type} onClick={onClick}>
    {children}
  </StyledButton>
);

Button.defaultProps = {
  area: '',
  onClick: noop,
  type: 'button',
};

export default Button;
