import { ReactComponent as UnstyledTrophy } from 'assets/icons/trophy.svg';
import styled from 'styled-components';

const Trophy = styled(UnstyledTrophy)<{ area: string; isDisabled: boolean }>`
  fill: ${({ isDisabled, theme }) =>
    isDisabled ? theme.colours.icon.disabled : theme.colours.icon.normal};
  grid-area: ${({ area }) => area};
  width: 16px;
  ${({ theme }) => theme.animations.fadein}
`;

export default Trophy;
