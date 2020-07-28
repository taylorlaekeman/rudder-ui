import { createGlobalStyle } from 'styled-components';

import themeDefinition from 'styles/theme';

export default createGlobalStyle`
  * {
    box-sizing: border-box;
    ${({ theme }: { theme: typeof themeDefinition }) => theme.font};
  } 

  body {
    margin: 0;
  }
`;
