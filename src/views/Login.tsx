import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

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
  font-size: 6rem;
  font-weight: 400;
  margin-bottom: 128px;
  margin-top: 64px;

  @media (min-width: 828px) {
    margin-top: 128px;
  }
`;

const Small = styled.span`
  display: block;
  font-size: 1.8rem;
`;

const Button = styled.button`
  appearance: none;
  background-color: ${({ theme }) => theme.colours.primary[100]};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 700;
  padding: 8px 16px;

  &:focus, &: hover {
    background-color: ${({ theme }) => theme.colours.primary[900]};
    color: ${({ theme }) => theme.colours.primary[100]};
    outline: none;
  }
`;

export default Login;
