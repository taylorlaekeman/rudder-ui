import React from 'react';
import styled from 'styled-components';

import noop from 'utils/noop';

const StyledInput = styled.input<{ area: string }>`
  background: none;
  border: none;
  border-bottom: solid ${({ theme }) => theme.colours.border} 1px;
  color: ${({ theme }) => theme.colours.text};
  grid-area: ${({ area }) => area};
  outline: none;
  width: 100%;
  ${({ theme }) => theme.font.medium};
`;

type propTypes = {
  area?: string;
  onChange?: { (value: string): void };
  value?: string;
};

const Input: React.FunctionComponent<propTypes> = ({
  area = '',
  onChange = noop,
  value = '',
}: propTypes) => (
  <StyledInput
    area={area}
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
