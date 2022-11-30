import * as yup from 'yup';
import i18n from 'util/i18next';

const specialRegex = /[`!@#$%^&*()_+\-=[\]{};':"|,.<>/?~\\]/;
const PASSWORD_LENGTH = 8;

export const SignupValidation = yup
  .object({
    email: yup
      .string()
      .required('error:error.required')
      .email('error:error.email-invalid'),
    password: yup
      .string()
      .required('error:error.required')
      .min(PASSWORD_LENGTH, () =>
        i18n.t('error:error.password-requirements', {
          length: PASSWORD_LENGTH,
        }),
      )
      // At least one special character
      .matches(specialRegex, () =>
        i18n.t('error:error.password-requirements', {
          length: PASSWORD_LENGTH,
        }),
      )
      // At least one letter
      .matches(/[a-zA-Z]/, () =>
        i18n.t('error:error.password-requirements', {
          length: PASSWORD_LENGTH,
        }),
      )
      // At least one number
      .matches(/\d/, () =>
        i18n.t('error:error.password-requirements', {
          length: PASSWORD_LENGTH,
        }),
      ),
  })
  .required();
