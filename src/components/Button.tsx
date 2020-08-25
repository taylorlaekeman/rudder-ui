import React, { FunctionComponent } from 'react';
import styled, { css } from 'styled-components';

import LoadingIndicator from 'components/LoadingIndicator';
import noop from 'utils/noop';

const Button: FunctionComponent<propTypes> = ({
  area = '',
  children,
  isDisabled = false,
  isLoading = false,
  isPlain = false,
  onClick = noop,
  type = 'button',
}: propTypes) => (
  <StyledButton
    $area={area}
    disabled={isDisabled}
    $isPlain={isPlain}
    onClick={onClick}
    type={type}
  >
    {isLoading ? <LoadingIndicator /> : children}
  </StyledButton>
);

type propTypes = {
  area?: string;
  children: React.ReactNode;
  isDisabled?: boolean;
  isLoading?: boolean;
  isPlain?: boolean;
  onClick?: { (): void };
  type?: 'button' | 'submit';
};

const StyledButton = styled.button<{
  $area: string;
  disabled: boolean;
  $isPlain: boolean;
}>`
  align-items: center;
  appearance: none;
  background-color: ${({ theme }) => theme.colours.background.button.normal};
  border: none;
  border-radius: 4px;
  color: ${({ theme }) => theme.colours.text.button.normal};
  display: flex;
  grid-area: ${({ $area }) => $area};
  padding: 8px 16px;

  ${({ theme }) => theme.font.medium}
  ${({ disabled, theme }) =>
    disabled &&
    css`
      color: ${theme.colours.text.button.disabled};
    `}
  ${({ $isPlain }) =>
    $isPlain &&
    css`
      background: none;
      padding: 0;
    `}

  &:focus, &:hover {
    outline: none;
    text-decoration: underline;

    ${({ $isPlain, theme }) =>
      !$isPlain &&
      css`
        background-color: ${theme.colours.background.button.focus};
        color: ${theme.colours.text.button.focus};
      `}

    svg {
      fill: ${({ theme }) => theme.colours.icon.focus};
    }
  }
`;

export default Button;
