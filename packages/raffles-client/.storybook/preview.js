import i18n from './i18next.js';
import theme from '../src/theme';
import { addDecorator } from '@storybook/react';
import { ThemeProvider } from '@mui/material';

addDecorator((Story) => (
  <ThemeProvider theme={theme}>
    <Story />
  </ThemeProvider>
));

export const parameters = {
  i18n,
  locale: 'en',
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
