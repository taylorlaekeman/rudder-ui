import { css } from 'styled-components';

const palette = {
  small: css`
    font-family: 'Lora', serif;
    font-size: 0.85rem;
    font-weight: 600;
    text-align: left;
  `,
  medium: css`
    font-family: 'Lora', serif;
    font-size: 0.95rem;
    font-weight: 600;
    text-align: left;
  `,
  large: css`
    font-family: 'Lora', serif;
    font-size: 1.2rem;
    font-weight: 400;
    text-align: left;
  `,
  extraLarge: css`
    font-family: 'Lora', serif;
    font-size: 2.8rem;
    font-weight: 400;
    text-align: left;
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
  subtitle: palette.large,
  title: palette.extraLarge,
};

export default fonts;
