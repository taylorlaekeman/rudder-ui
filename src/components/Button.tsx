import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

import LoadingIndicator from 'components/LoadingIndicator';
import noop from 'utils/noop';

const Button: FunctionComponent<propTypes> = ({
  area = '',
  children,
  isLoading = false,
  isStruck = false,
  isText = false,
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
    {isLoading ? <LoadingIndicator /> : children}
  </StyledButton>
);

type propTypes = {
  area?: string;
  children: React.ReactNode;
  isLoading?: boolean;
  isStruck?: boolean;
  isText?: boolean;
  isUnderlined?: boolean;
  onClick?: { (): void };
  type?: 'button' | 'submit';
};

const StyledButton = styled.button<{
  $area: string;
  $isText: boolean;
  $isStruck: boolean;
  $isUnderlined: boolean;
}>`
  align-items: center;
  appearance: none;
  background-color: ${({ theme }) => theme.colours.background.button.normal};
  border: none;
  border-radius: 4px;
  color: ${({ theme }) => theme.colours.text.button.normal};
  cursor: ${({ $isText }) => ($isText ? 'text' : 'pointer')};
  display: flex;
  grid-area: ${({ $area }) => $area};
  padding: 8px 16px;

  ${({ theme }) => theme.font.medium};
  ${({ $isStruck, $isUnderlined }) => {
    if ($isStruck && $isUnderlined)
      return 'text-decoration: underline line-through;';
    if ($isStruck) return 'text-decoration: line-through;';
    if ($isUnderlined) return 'text-decoration: underline';
    return '';
  }}

  &:focus, &:hover {
    background-color: ${({ theme }) => theme.colours.background.button.focus};
    color: ${({ theme }) => theme.colours.text.button.focus};
    outline: none;
    text-decoration: ${({ $isStruck }) => $isStruck && 'line-through'} underline;

    svg {
      fill: ${({ theme }) => theme.colours.icon.focus};
    }
  }
`;

export default Button;
