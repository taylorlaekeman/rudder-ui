import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

import Button from 'components/Button';
import Link from 'components/Link';
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
          <Link to="/journey">
            Journey
          </Link>
          <Button isPlain onClick={logout}>
            Logout
          </Button>
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

  @media (min-width: 580px) {
    width: 580px;
  }

  @media (min-width: 1080px) {
    padding: 80px 40px;
    width: 1080px;
  }
`;

const Title = styled.h1`
  font-size: 1.2rem;
  font-weight: 500;

  @media (min-width: 1080px) {
    font-size: 2rem;
  }
`;

const Nav = styled.nav`
  display: grid;
  grid-auto-flow: column;
  grid-gap: 20px;
`;

export default Header;
