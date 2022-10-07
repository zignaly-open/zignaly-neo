import { createTheme } from '@mui/material';
import { dark } from '@zignaly-open/ui';
import Theme from '@zignaly-open/ui/lib/theme/theme';

export default createTheme({
  palette: {
    ...(Object.fromEntries(
      Object.entries(dark).map(([k, v]) => [k, { main: v }]),
    ) as Record<keyof Theme, { main: string }>),

    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#770fc8',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      dark: '#191927',
      main: '#656565',
    },

    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
  typography: {
    fontFamily: [
      'Avenir Next',
      'Roboto',
      'Helvetica',
      'Arial',
      'sans-serif',
    ].join(','),
  },
  components: {
    // Name of the component
    MuiButtonBase: {
      defaultProps: {
        // The props to change the default for.
      },
    },
  },
});
