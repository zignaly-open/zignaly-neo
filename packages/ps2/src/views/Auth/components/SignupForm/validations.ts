import * as yup from 'yup';
import mailcheck from 'mailcheck';
import i18n from 'util/i18next';

const specialRegex = /[`!@#$%^&*()_+\-=[\]{};':"|,.<>/?~\\]/;

export const SignupValidation = yup
  .object({
    email: yup
      .string()
      .required('error:error.required')
      .test('misspell', async (value, ctx) => {
        const suggested = await new Promise((resolve) => {
          mailcheck.run({
            email: value,
            suggested: (suggestion: { full: string }) =>
              resolve(suggestion.full),
            empty: () => resolve(true),
          });
        });
        return typeof suggested === 'string'
          ? ctx.createError({
              message: i18n.t('error:error.did-you-mean', { suggested }),
            })
          : true;
      })
      .email('error:error.email-invalid'),
    password: yup
      .string()
      .required('error:error.required')
      .min(8, () => i18n.t('error:error.password-length', { length: 8 }))
      // At least one special character
      .matches(specialRegex, 'error:error.password-format')
      // At least one letter
      .matches(/[a-zA-Z]/, 'error:error.password-format')
      // At least one number
      .matches(/\d/, 'error:error.password-format'),
  })
  .required();
