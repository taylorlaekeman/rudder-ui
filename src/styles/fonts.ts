import { css } from 'styled-components';

const palette = {
  small: css`
    font-family: 'Lora', serif;
    font-size: 0.85rem;
    font-weight: 600;
  `,
  medium: css`
    font-family: 'Lora', serif;
    font-size: 0.95rem;
    font-weight: 500;
  `,
  large: css`
    font-family: 'Lora', serif;
    font-size: 1.6rem;
    font-weight: 700;
  `,
  huge: css`
    font-family: 'Lora', serif;
    font-size: 2.2rem;
    font-weight: 800;
  `,
};

const fonts = {
  body: palette.small,
  button: palette.medium,
  default: palette.medium,
  input: palette.medium,
  label: palette.small,
  link: palette.medium,
  logo: palette.large,
  title: palette.huge,
};

export default fonts;
