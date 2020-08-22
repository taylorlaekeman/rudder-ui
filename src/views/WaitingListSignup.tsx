import { useMutation } from '@apollo/client';
import React, { FunctionComponent, useEffect, useState } from 'react';
import styled from 'styled-components';

import { mutations } from 'api';
import Button from 'components/Button';
import UnstyledForm from 'components/Form';
import Input from 'components/Form/Input';
import Checkmark from 'components/icons/Checkmark';
import analytics from 'utils/analytics';

const WaitingListSignup: FunctionComponent = () => {
  const [email, setEmail] = useState('');
  const [
    registerEmail,
    { data, error, loading: isLoading },
  ] = useMutation(mutations.registerEmail, { errorPolicy: 'all' });

  useEffect(() => {
    if (data) analytics.logWaitingListSignup();
  }, [data]);

  return (
    <Form onSubmit={() => registerEmail({ variables: { email } })}>
      {data && !error ? (
        <Success>Thanks for joining the waiting list!</Success>
      ) : (
        <Input
          area="input"
          hasError={!!error?.message}
          label="email"
          onChange={setEmail}
          placeholder="Enter your email"
          type="email"
          value={email}
        />
      )}
      {data && !error ? (
        <Checkmark />
      ) : (
        <Button area="button" isLoading={isLoading} type="submit">
          Join the waiting list
        </Button>
      )}
    </Form>
  );
};

const Form = styled(UnstyledForm)`
  display: grid;
  grid-template-areas:
    'input  input'
    'button .    ';
  grid-template-columns: max-content 1fr;
  margin-top: 128px;
  max-width: 300px;
`;

const Success = styled.p`
  display: inline-block;
  grid-area: input;
  margin-bottom: 64px;
`;

export default WaitingListSignup;
