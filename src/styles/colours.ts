const palette = {
  brand: {
    500: 'hsl(214, 80%, 43%)',
    900: 'hsl(214, 80%, 15%)',
  },
  neutral: {
    700: 'hsl(214, 10%, 45%)',
  },
};

export default {
  border: palette.brand[900],
  fill: palette.brand[900],
  icon: palette.brand[900],
  text: {
    body: palette.brand[900],
    placeholder: palette.neutral[700],
  },
};
