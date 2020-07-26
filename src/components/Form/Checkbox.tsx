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

type propTypes = {
  onChange?: { (): void };
  value?: boolean;
};

const Checkbox: React.FunctionComponent<propTypes> = ({
  onChange = noop,
  value = false,
}: propTypes) => (
  <>
    <Input type="checkbox" />
    <Label isChecked={value} />
  </>
);

export default Checkbox;
