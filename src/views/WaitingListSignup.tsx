import { useMutation } from '@apollo/client';
import React, { FunctionComponent, useState } from 'react';
import styled from 'styled-components';

import { mutations } from 'api';
import Button from 'components/Button';
import UnstyledForm from 'components/Form';
import Input from 'components/Form/Input';

const WaitingListSignup: FunctionComponent = () => {
  const [email, setEmail] = useState('');
  const [
    registerEmail,
    { error, loading: isLoading },
  ] = useMutation(mutations.registerEmail, { errorPolicy: 'all' });
  return (
    <Form onSubmit={() => registerEmail({ variables: { email } })}>
      <Input
        area="input"
        hasError={!!error?.message}
        label="email"
        onChange={setEmail}
        placeholder="Enter your email"
        type="email"
        value={email}
      />
      <Button area="button" isLoading={isLoading} type="submit">
        Join the waiting list
      </Button>
    </Form>
  );
};

const Form = styled(UnstyledForm)`
  display: grid;
  grid-template-areas:
    'input  input'
    'button .    ';
  grid-template-columns: max-content 1fr;
  margin-top: 256px;
`;

export default WaitingListSignup;
