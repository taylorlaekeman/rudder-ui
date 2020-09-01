import React, { FunctionComponent } from 'react';
import { Link as UnstyledLink } from 'react-router-dom';
import styled from 'styled-components';

const Link: FunctionComponent<propTypes> = ({
  children = '',
  isButton = false,
  isStruck = false,
  to = '',
}: propTypes) => (
  <StyledLink $isButton={isButton} $isStruck={isStruck} to={to}>
    {children}
  </StyledLink>
);

type propTypes = {
  children?: React.ReactNode;
  isButton?: boolean;
  isStruck?: boolean;
  to?: string;
};

const StyledLink = styled(UnstyledLink)<{
  $isButton: boolean;
  $isStruck: boolean;
}>`
  ${({ $isButton, theme }) =>
    $isButton
      ? theme.components.clickable.button
      : theme.components.clickable.link}
`;

export default Link;
