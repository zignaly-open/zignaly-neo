import * as yup from 'yup';
import { Features } from '@zignaly-open/ps2-definitions';

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

function checkMinInvestmentIfEnabled(val: number) {
  const isMinInvestmentOn =
    this.from[1]?.value?.settings?.[Features.MinInvestment];
  return !isMinInvestmentOn || val > 0;
}

function checkMinScoreIfEnabled(val: number) {
  const isScoreOn = this.parent?.settings?.[Features.ZScore];
  return !isScoreOn || (val > 0 && val <= 100);
}

export const SettingsConfigValidation = yup
  .object({
    marketplaceMinScore: yup
      .number()
      .typeError('config:settings.validation-number')
      .test(
        'range',
        'config:settings.validation-number-0-100',
        checkMinScoreIfEnabled,
      ),
    minInvestment: yup.object({
      BTC: yup
        .number()
        .typeError('config:settings.validation-number')
        .test(
          'range',
          'config:settings.validation-number-gt-0',
          checkMinInvestmentIfEnabled,
        ),
      ETH: yup
        .number()
        .typeError('config:settings.validation-number')
        .test(
          'range',
          'config:settings.validation-number-gt-0',
          checkMinInvestmentIfEnabled,
        ),
      USDT: yup
        .number()
        .typeError('config:settings.validation-number')
        .test(
          'range',
          'config:settings.validation-number-gt-0',
          checkMinInvestmentIfEnabled,
        ),
      BNB: yup
        .number()
        .typeError('config:settings.validation-number')
        .test(
          'range',
          'config:settings.validation-number-gt-0',
          checkMinInvestmentIfEnabled,
        ),
    }),
  })
  .required();

export const ProfileConfigValidation = yup
  .object({
    name: yup.string().required('common:required'),
    image: yup.string().required('common:required'),
    favicon: yup.string().required('common:required'),
    logo: yup.string().required('common:required'),
    title: yup
      .string()
      .required('common:required')
      .test('max', 'config:should-be-under-x-chars', (v) => v.length < 100),
    description: yup
      .string()
      .required('common:required')
      .test('max', 'config:should-be-under-x-chars', (v) => v.length < 500),

    privacyPolicy: yup.string().url('config:socials.validation-url'),
    tos: yup.string().url('config:socials.validation-url'),

    tools: yup.object({
      google_tag_manager: yup
        .string()
        .test(
          'format',
          'config:gtm-pattern',
          (v) => !v || /^GTM-[A-Z\d]{6,10}$/.test(v),
        ),
    }),
  })
  .required();
