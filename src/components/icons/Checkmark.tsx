import { ReactComponent as UnstyledCheckmark } from 'assets/icons/checkmark.svg';
import styled from 'styled-components';

const Checkmark = styled(UnstyledCheckmark)`
  fill: ${({ theme }) => theme.colours.icon.normal};
  width: 16px;
  ${({ theme }) => theme.animations.fadein}
`;

export default Checkmark;
