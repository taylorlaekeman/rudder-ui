import React from 'react';
import { Link as UnstyledLink } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(UnstyledLink)`
  color: ${({ theme }) => theme.colours.text};
  display: block;
  font-size: 1.2rem;
  padding: 16px;
`;

const Link = ({ children, to }: { children: React.ReactNode, to: string }) => (
  <StyledLink to={to}>{children}</StyledLink>
);

export default Link;
