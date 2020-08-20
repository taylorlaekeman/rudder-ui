import React from 'react';
import styled from 'styled-components';

import noop from 'utils/noop';

const StyledForm = styled.form<{ area: string }>`
  grid-area: ${({ area }) => area};
`;

type propTypes = {
  area?: string;
  children: React.ReactNode;
  className?: string;
  onSubmit?: { (): void };
};

const Form: React.FunctionComponent<propTypes> = ({
  area = '',
  children,
  className = '',
  onSubmit = noop,
}: propTypes) => (
  <StyledForm
    action="#"
    area={area}
    className={className}
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
