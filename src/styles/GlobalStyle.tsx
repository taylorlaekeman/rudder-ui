import { createGlobalStyle } from 'styled-components';

import themeDefinition from 'styles/theme';

export default createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    ${({ theme }: { theme: typeof themeDefinition }) => theme.font.medium};
  } 

  h2 {
    ${({ theme }: { theme: typeof themeDefinition }) => theme.font.large};
  }

  p {
    ${({ theme }: { theme: typeof themeDefinition }) => theme.font.small};
  }

  a, button, h1, h2, input, p {
    color: ${({ theme }) => theme.colours.text.body};
  }
`;
