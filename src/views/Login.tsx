import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

import Button from 'components/Button';
import useAuth from 'hooks/useAuth';

const Login: FunctionComponent = () => {
  const { login } = useAuth();

  return (
    <>
      <Text>Welcome to Rudder</Text>
      <Button onClick={login}>Login or Signup</Button>
    </>
  );
};

const Text = styled.h2`
  margin-bottom: 128px;
  margin-top: 64px;
  ${({ theme }) => theme.fonts.title}
`;

export default Login;
