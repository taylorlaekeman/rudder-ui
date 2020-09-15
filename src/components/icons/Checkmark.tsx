import { ReactComponent as UnstyledCheckmark } from 'assets/icons/checkmark.svg';
import styled from 'styled-components';

const Checkmark = styled(UnstyledCheckmark)<{ area?: string }>`
  fill: ${({ theme }) => theme.colours.icon.normal};
  grid-area: ${({ area }) => area};
  width: 14px;
  ${({ theme }) => theme.animations.fadein}
`;

export default Checkmark;
