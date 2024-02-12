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
