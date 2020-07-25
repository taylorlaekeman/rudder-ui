import React from 'react';
import styled from 'styled-components';

import noop from 'utils/noop';

const StyledForm = styled.form<{ area: string }>`
  grid-area: ${({ area }) => area};
`;

const Form = ({
  area = '',
  children,
  onSubmit = noop,
}: {
  area?: string;
  children: React.ReactNode;
  onSubmit?: { (): void };
}) => (
  <StyledForm
    action="#"
    area={area}
    noValidate
    onSubmit={(event) => {
      event.preventDefault();
      onSubmit();
    }}
  >
    {children}
  </StyledForm>
);

Form.defaultProps = {
  area: '',
  onSubmit: noop,
};

export default Form;
