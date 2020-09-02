import { createGlobalStyle } from 'styled-components';

import themeDefinition from 'styles/theme';

export default createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    ${({ theme }: { theme: typeof themeDefinition }) => theme.fonts.body};
  } 

  h2 {
    padding-bottom: 4px;
    ${({ theme }: { theme: typeof themeDefinition }) => theme.fonts.pageTitle};
  }

  p {
    ${({ theme }: { theme: typeof themeDefinition }) => theme.fonts.body};
  }

  a, h1, h2, p {
    color: ${({ theme }) => theme.colours.text.normal};
  }
`;
