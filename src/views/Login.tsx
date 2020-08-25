import { useAuth0 } from '@auth0/auth0-react';
import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

import Button from 'components/Button';

const Login: FunctionComponent = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <>
      <Text>Welcome to Rudder</Text>
      <Button onClick={loginWithRedirect}>Login or Signup</Button>
    </>
  );
};

const Text = styled.h2`
  margin-bottom: 128px;
  margin-top: 64px;
  ${({ theme }) => theme.font.extraLarge}
`;

export default Login;
