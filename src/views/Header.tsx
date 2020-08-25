import { useAuth0 } from '@auth0/auth0-react';
import React, { FunctionComponent } from 'react';
import { useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';

import Button from 'components/Button';
import Link from 'components/Link';
import settings from 'settings';

const StyledHeader = styled.header`
  align-items: baseline;
  display: flex;
  justify-content: space-between;
  margin-bottom: 32px;
  ${({ theme }) => theme.pageSize}
`;

const Heading = styled.h1`
  font-size: 2rem;
  font-weight: 900;
  letter-spacing: 1px;
  margin: 0;

  @media (min-width: 732px) {
    font-size: 3rem;
  }
`;

const Header: FunctionComponent = () => {
  const match = useRouteMatch('/');
  const { isAuthenticated, logout } = useAuth0();
  return (
    <StyledHeader>
      <Heading>Rudder</Heading>
      {isAuthenticated && (
        <Button
          isPlain
          onClick={() => logout({ returnTo: settings.AUTH_REDIRECT })}
        >
          Logout
        </Button>
      )}
      {!match?.isExact && <Link to="/">Sprints &gt;</Link>}
    </StyledHeader>
  );
};

export default Header;
