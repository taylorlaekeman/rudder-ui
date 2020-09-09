import { css } from 'styled-components';

const responsiveSizing = css`
  padding: 0 32px;
  padding-top: 32px;
  width: 100%;

  @media (min-width: 464px) {
    width: 464px;
  }

  @media (min-width: 828px) {
    width: 828px;
  }
`;

export default responsiveSizing;
