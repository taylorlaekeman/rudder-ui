const palette = {
  brand: {
    100: 'hsl(214, 90%, 97%)',
    300: 'hsl(214, 40%, 80%)',
    500: 'hsl(214, 70%, 35%)',
    700: 'hsl(214, 30%, 40%)',
    900: 'hsl(214, 30%, 20%)',
  },
  error: {
    900: 'red',
  },
  neutral: {
    100: 'white',
    700: 'hsl(214, 10%, 45%)',
  },
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
      error: palette.error[900],
      focus: palette.brand[900],
      normal: palette.brand[700],
    },
  },
  icon: {
    focus: palette.brand[100],
    normal: palette.brand[900],
  },
  text: {
    button: {
      focus: palette.brand[100],
      normal: palette.brand[900],
    },
    input: {
      error: palette.error[900],
      focus: palette.brand[900],
      normal: palette.brand[700],
      placeholder: palette.brand[300],
    },
    label: {
      error: palette.error[900],
      focus: palette.brand[900],
      normal: palette.brand[700],
    },
    normal: palette.brand[900],
    placeholder: palette.brand[700],
  },
};
