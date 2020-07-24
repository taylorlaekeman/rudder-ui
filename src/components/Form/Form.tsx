import React from 'react';
import styled from 'styled-components';

const StyledForm = styled.form<{ area: string }>`
  grid-area: ${({ area }) => area};
`;

const Form = ({
  area = '',
  children,
  onSubmit = () => {},
}: {
  area?: string;
  children: React.ReactNode;
  onSubmit: { (): void };
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

export default Form;
