import React from 'react';
import styled from 'styled-components';

import noop from 'utils/noop';

const StyledInput = styled.input`
  background: none;
  border: solid ${({ theme }) => theme.colours.border} 1px;
  color: ${({ theme }) => theme.colours.text};
  font-size: 1.2rem;
  outline: none;
  padding: 16px;
  width: 100%;
`;

type propTypes = {
  onChange?: { (value: string): void };
  value?: string;
};

const Input: React.FunctionComponent<propTypes> = ({
  onChange = noop,
  value = '',
}: propTypes) => (
  <StyledInput
    onChange={(event) => onChange(event.target.value)}
    type="text"
    value={value}
  />
);

Input.defaultProps = {
  onChange: noop,
  value: '',
};

export default Input;
