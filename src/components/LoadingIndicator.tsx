import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

import { ReactComponent as UnstyledCog } from 'assets/icons/cog.svg';

type propTypes = {
  isLarge?: boolean;
};

const LoadingIndicator: FunctionComponent<propTypes> = ({
  isLarge = false,
}: propTypes) => (
  <Wrapper $isLarge={isLarge}>
    <Cog $isLarge={isLarge} />
  </Wrapper>
);

const Wrapper = styled.div<{ $isLarge: boolean }>`
  align-items: center;
  display: flex;
  justify-content: center;
  width: 100%;
  ${({ $isLarge }) => $isLarge && 'padding: 32px;'}
`;

const Cog = styled(UnstyledCog)<{ $isLarge: boolean }>`
  fill: ${({ theme }) => theme.colours.icon};
  width: ${({ $isLarge }) => ($isLarge ? '32px' : '16px')};
  ${({ theme }) => theme.animations.fadein}
  ${({ theme }) => theme.animations.spin}
`;

export default LoadingIndicator;
