import i18n from './i18next.js';
import theme from '../src/theme';
import { addDecorator } from '@storybook/react';
import { ThemeProvider as ThemeProviderMui } from '@mui/material';
import { MockedProvider } from '@apollo/client/testing';
import { dark, ThemeProvider } from '@zignaly-open/ui';

const augmentedTheme = { ...dark, ...theme };

addDecorator((Story) => (
  <ThemeProvider theme={dark}>
    <ThemeProviderMui theme={augmentedTheme}>
      <Story />
    </ThemeProviderMui>
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
  apolloClient: {
    MockedProvider,
  },
  layout: 'fullscreen',
};
