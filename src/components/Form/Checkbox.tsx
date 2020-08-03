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

const Wrapper = styled.div<{ area: string }>`
  grid-area: ${({ area }) => area};
`;

type propTypes = {
  area?: string;
  id: string;
  onChange?: { (value: boolean): void };
  value?: boolean;
};

const Checkbox: React.FunctionComponent<propTypes> = ({
  area = '',
  id,
  onChange = noop,
  value = false,
}: propTypes) => (
  <Wrapper area={area}>
    <Input
      checked={value}
      id={id}
      onChange={() => onChange(!value)}
      type="checkbox"
    />
    <Label htmlFor={id} isChecked={value} />
  </Wrapper>
);

export default Checkbox;
