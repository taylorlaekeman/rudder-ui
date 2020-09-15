import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

import { ReactComponent as UnstyledCog } from 'assets/icons/cog.svg';

const LoadingIndicator: FunctionComponent<propTypes> = ({
  area = '',
  isLarge = false,
}: propTypes) => (
  <Wrapper $area={area} $isLarge={isLarge}>
    <Cog $isLarge={isLarge} />
  </Wrapper>
);

type propTypes = {
  area?: string;
  isLarge?: boolean;
};

const Wrapper = styled.div<{ $area: string; $isLarge: boolean }>`
  align-items: center;
  display: flex;
  grid-area: ${({ $area }) => $area};
  justify-content: center;
  width: 100%;
  ${({ $isLarge }) => $isLarge && 'padding: 32px;'}
`;

const Cog = styled(UnstyledCog)<{ $isLarge: boolean }>`
  fill: ${({ theme }) => theme.colours.icon.normal};
  width: ${({ $isLarge }) => ($isLarge ? '32px' : '16px')};
  ${({ theme }) => theme.animations.fadein}
  ${({ theme }) => theme.animations.spin}
`;

export default LoadingIndicator;
