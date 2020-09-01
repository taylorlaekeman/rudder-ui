import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

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
  $isPlain: boolean;
}>`
  ${({ $isPlain, theme }) =>
    $isPlain
      ? theme.components.clickable.link
      : theme.components.clickable.button}
`;

export default Button;
