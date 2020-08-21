import React, { FunctionComponent } from 'react';
import { useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';

import Link from 'components/Link';

const StyledHeader = styled.header`
  align-items: center;
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
  return (
    <StyledHeader>
      <Heading>Rudder</Heading>
      {!match?.isExact && <Link to="/">Sprints &gt;</Link>}
    </StyledHeader>
  );
};

export default Header;
