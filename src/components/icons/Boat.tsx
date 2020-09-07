import { ReactComponent as UnstyledBoat } from 'assets/icons/location-marina.svg';
import styled from 'styled-components';

const Boat = styled(UnstyledBoat)<{ area: string }>`
  fill: ${({ theme }) => theme.colours.icon.normal};
  grid-area: ${({ area }) => area};
  width: 16px;
  ${({ theme }) => theme.animations.fadein}
`;

export default Boat;
