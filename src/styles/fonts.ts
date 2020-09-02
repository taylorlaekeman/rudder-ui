import { css } from 'styled-components';

const buildFont = (size: string, weight: number) => css`
  font-family: 'Lora', serif;
  font-size: ${size};
  font-weight: ${weight};
`;

const fontSizes = {
  tiny: '0.85rem',
  small: '0.95rem',
  medium: '1.2rem',
  large: '2.2rem',
  huge: '5rem',
};

const fonts = {
  body: buildFont(fontSizes.tiny, 600),
  button: buildFont(fontSizes.small, 500),
  input: buildFont(fontSizes.small, 500),
  label: buildFont(fontSizes.tiny, 600),
  link: buildFont(fontSizes.small, 500),
  logo: buildFont(fontSizes.medium, 700),
  splash: buildFont(fontSizes.huge, 700),
  listSprint: {
    days: buildFont(fontSizes.tiny, 600),
    goals: buildFont(fontSizes.tiny, 400),
    title: buildFont(fontSizes.medium, 500),
  },
  subsplash: buildFont(fontSizes.medium, 500),
  pageTitle: buildFont(fontSizes.large, 700),
};

export default fonts;
