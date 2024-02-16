import * as yup from 'yup';

export const CommunicationConfigValidation = yup
  .object({
    supportUrl: yup.string().url('config:socials.validation-url'),
    social: yup.object({
      twitter: yup.string().url('config:socials.validation-url'),
      telegram: yup.string().url('config:socials.validation-url'),
      instagram: yup.string().url('config:socials.validation-url'),
      discord: yup.string().url('config:socials.validation-url'),
      youtube: yup.string().url('config:socials.validation-url'),
      medium: yup.string().url('config:socials.validation-url'),
      linkedin: yup.string().url('config:socials.validation-url'),
    }),
  })
  .required();

export const SettingsConfigValidation = yup
  .object({
    marketplaceMinScore: yup
      .number()
      .typeError('config:settings.validation-number')
      .test('range', 'config:settings.validation-number-0-100', (v) => v > 0),
    minInvestment: yup.object({
      BTC: yup
        .number()
        .typeError('config:settings.validation-number')
        .test('range', 'config:settings.validation-number-gt-0', (v) => v > 0),
      ETH: yup
        .number()
        .typeError('config:settings.validation-number')
        .test('range', 'config:settings.validation-number-gt-0', (v) => v > 0),
      USDT: yup
        .number()
        .typeError('config:settings.validation-number')
        .test('range', 'config:settings.validation-number-gt-0', (v) => v > 0),
      BNB: yup
        .number()
        .typeError('config:settings.validation-number')
        .test('range', 'config:settings.validation-number-gt-0', (v) => v > 0),
    }),
  })
  .required();
