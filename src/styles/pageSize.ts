import { css } from 'styled-components';

const responsiveSizing = css`
  padding: 0 32px;
  padding-top: 32px;
  width: 100%;

  @media (min-width: 528px) {
    width: 400px;
  }

  @media (min-width: 628px) {
    padding: 0 50px;
    width: 100%;
  }

  @media (min-width: 828px) {
    padding: 0;
    width: 600px;
  }
`;

export default responsiveSizing;
