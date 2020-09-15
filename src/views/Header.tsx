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
        <Button isPlain onClick={logout}>
          Logout
        </Button>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.header`
  align-items: baseline;
  display: flex;
  justify-content: space-between;

  ${({ theme }) => theme.pageSize}
`;

const Title = styled.h1`
  font-size: 1.2rem;
  font-weight: 500;
`;

export default Header;
