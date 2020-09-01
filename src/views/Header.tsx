import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

import Button from 'components/Button';
import Link from 'components/Link';
import useAuth from 'hooks/useAuth';

const Header: FunctionComponent = () => {
  const { isAuthenticated, logout } = useAuth();
  return (
    <StyledHeader>
      <Link to="/">
        <h1>Rudder</h1>
      </Link>
      {isAuthenticated && (
        <Button isPlain onClick={logout}>
          Logout
        </Button>
      )}
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  align-items: baseline;
  display: flex;
  justify-content: space-between;
  padding-bottom: 64px;
  ${({ theme }) => theme.pageSize}
`;

export default Header;
