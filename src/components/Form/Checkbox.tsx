import React from 'react';
import styled from 'styled-components';

import noop from 'utils/noop';

const Input = styled.input`
  appearance: none;
`;

const Label = styled.label<{ isChecked: boolean }>`
  background-color: ${({ isChecked, theme }) =>
    isChecked ? theme.colours.fill : 'white'};
  border: solid ${({ theme }) => theme.colours.fill} 2px;
  border-radius: 16px;
  cursor: pointer;
  display: inline-block;
  height: 16px;
  width: 16px;
`;

const Checkbox = ({
  onChange = noop,
  value = false,
}: {
  onChange?: { (): void };
  value?: boolean;
}) => (
  <>
    <Input type="checkbox" />
    <Label isChecked={value} />
  </>
);

export default Checkbox;
