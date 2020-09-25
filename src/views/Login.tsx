import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

import Button from 'components/Button';
import useAuth from 'hooks/useAuth';

const Login: FunctionComponent = () => {
  const { login } = useAuth();

  return (
    <>
      <Text>
        <Small>Welcome to</Small>
        Rudder
      </Text>
      <Button onClick={login}>Login or Signup</Button>
    </>
  );
};

const Text = styled.h2`
  margin-bottom: 128px;
  margin-top: 64px;

  @media (min-width: 828px) {
    margin-top: 128px;
  }

  ${({ theme }) => theme.fonts.splash}
`;

const Small = styled.span`
  display: block;

  ${({ theme }) => theme.fonts.subsplash}
`;

export default Login;
