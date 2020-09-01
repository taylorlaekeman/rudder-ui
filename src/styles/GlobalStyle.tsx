import { createGlobalStyle } from 'styled-components';

import themeDefinition from 'styles/theme';

export default createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    ${({ theme }: { theme: typeof themeDefinition }) => theme.fonts.default};
  } 

  h1 {
    ${({ theme }: { theme: typeof themeDefinition }) => theme.fonts.logo};
  }

  h2 {
    padding-bottom: 32px;
    ${({ theme }: { theme: typeof themeDefinition }) => theme.fonts.title};
  }

  p {
    ${({ theme }: { theme: typeof themeDefinition }) => theme.fonts.body};
  }

  a, h1, h2, p {
    color: ${({ theme }) => theme.colours.text.normal};
  }
`;
