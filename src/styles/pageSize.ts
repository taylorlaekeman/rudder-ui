import { css } from 'styled-components';

const responsiveSizing = css`
  padding: 0 40px;
  padding-top: 40px;
  width: 100%;

  @media (min-width: 464px) {
    width: 464px;
  }

  @media (min-width: 828px) {
    width: 828px;
  }
`;

export default responsiveSizing;
