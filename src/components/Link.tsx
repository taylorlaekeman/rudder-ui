import React from 'react';
import { Link as UnstyledLink } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(UnstyledLink)`
  color: ${({ theme }) => theme.colours.text};
  display: block;
  font-size: 1.2rem;
  padding: 16px;
`;

type propTypes = {
  children: React.ReactNode;
  to: string;
};

const Link: React.FunctionComponent<propTypes> = ({
  children,
  to,
}: propTypes) => <StyledLink to={to}>{children}</StyledLink>;

export default Link;
