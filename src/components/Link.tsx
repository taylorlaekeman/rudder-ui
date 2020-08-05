import React from 'react';
import { Link as UnstyledLink } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(UnstyledLink)<{ $isStruck: boolean }>`
  color: ${({ theme }) => theme.colours.text};
  display: block;
  font-size: 1.2rem;
  text-decoration: ${({ $isStruck }) =>
    $isStruck ? 'line-through 2px' : 'none'};
  ${({ theme }) => theme.font.medium}
`;

type propTypes = {
  children?: React.ReactNode;
  isStruck?: boolean;
  to?: string;
};

const Link: React.FunctionComponent<propTypes> = ({
  children = '',
  isStruck = false,
  to = '',
}: propTypes) => (
  <StyledLink $isStruck={isStruck} to={to}>
    {children}
  </StyledLink>
);

export default Link;
