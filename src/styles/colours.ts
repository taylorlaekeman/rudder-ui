import { css } from 'styled-components';

const palette = {
  brand: {
    100: 'hsl(214, 90%, 98%)',
    200: 'hsl(214, 79%, 93%)',
    300: 'hsl(214, 70%, 77%)',
    400: 'hsl(214, 90%, 68%)',
    500: 'hsl(214, 85%, 55%)',
    600: 'hsl(214, 65%, 44%)',
    700: 'hsl(214, 65%, 35%)',
    800: 'hsl(214, 75%, 23%)',
    900: 'hsl(214, 80%, 15%)',
  },
  error: 'red',
  white: 'white',
};

export default {
  background: {
    button: {
      focus: palette.brand[900],
      normal: palette.brand[100],
    },
  },
  border: {
    input: {
      error: palette.error,
      focus: palette.brand[900],
      normal: palette.brand[700],
    },
  },
  icon: {
    disabled: palette.brand[300],
    focus: palette.brand[100],
    normal: palette.brand[900],
  },
  text: {
    button: {
      disabled: palette.brand[300],
      focus: palette.brand[100],
      normal: palette.brand[800],
    },
    input: {
      error: palette.error,
      focus: palette.brand[900],
      normal: palette.brand[700],
      placeholder: palette.brand[300],
    },
    label: {
      error: palette.error,
      focus: palette.brand[900],
      normal: palette.brand[700],
    },
    listSprint: {
      disabled: css`
        color: ${palette.brand[300]};
      `,
      focus: palette.brand[900],
      normal: css`
        color: ${palette.brand[900]};
      `,
    },
    normal: palette.brand[800],
    placeholder: palette.brand[700],
  },
};
