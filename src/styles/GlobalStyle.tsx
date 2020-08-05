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
    color: ${({ theme }) => theme.colours.text};
  }

  p {
    ${({ theme }: { theme: typeof themeDefinition }) => theme.font.small};
    color: ${({ theme }) => theme.colours.text};
  }
`;
