import React, { FunctionComponent } from 'react';
import { Link as UnstyledLink } from 'react-router-dom';
import styled from 'styled-components';

import useAuth from 'hooks/useAuth';

const Header: FunctionComponent = () => {
  const { isAuthenticated, logout } = useAuth();
  return (
    <Wrapper>
      <Link to="/">
        <Title>Rudder</Title>
      </Link>
      {isAuthenticated && (
        <Nav>
          <Link to="/journey">Journey</Link>
          <Button onClick={logout}>Logout</Button>
        </Nav>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.header`
  align-items: baseline;
  display: flex;
  justify-content: space-between;
  padding: 40px;
  width: 100%;

  @media (min-width: 600px) {
    width: 600px;
  }
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colours.text.normal};
  font-size: 1.1rem;
  font-weight: 600;

  @media (min-width: 600px) {
    font-size: 1.5rem;
  }
`;

const Nav = styled.nav`
  display: grid;
  grid-auto-flow: column;
  grid-gap: 30px;
`;

const Link = styled(UnstyledLink)`
  color: ${({ theme }) => theme.colours.text.normal};
  font-size: 1.1rem;
  font-weight: 600;
  text-decoration: none;

  &:focus,
  &:hover {
    text-decoration: underline;
  }

  @media (min-width: 600px) {
    font-size: 1.5rem;
  }
`;

const Button = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colours.text.normal};
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 600;
  padding: 0;

  &:focus,
  &:hover {
    text-decoration: underline;
  }

  @media (min-width: 600px) {
    font-size: 1.5rem;
  }
`;

export default Header;
