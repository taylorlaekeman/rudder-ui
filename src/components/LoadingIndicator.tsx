import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

import { ReactComponent as UnstyledCog } from 'assets/icons/cog.svg';

const Cog = styled(UnstyledCog)`
  animation: spin 2s linear infinite;
  fill: ${({ theme }) => theme.colours.icon};
  width: 32px;

  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  padding: 32px;
  width: 100%;
`;

const LoadingIndicator: FunctionComponent = () => (
  <Wrapper>
    <Cog />
  </Wrapper>
);

export default LoadingIndicator;
