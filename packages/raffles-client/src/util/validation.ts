import * as yup from 'yup';

export const UserSettingsValidation = yup
  .object({
    username: yup
      .string()
      .trim()
      .matches(/^[a-z0-9-._]{3,20}$/i, {
        message:
          'The username must be between 3 and 20 characters, allowed special symbols: -._',
        excludeEmptyString: true,
      }),
    email: yup.string().trim().email('The email is not valid'),
    discordName: yup
      .string()
      .trim()
      .matches(/^.{3,32}#[0-9]{4}$/, {
        message: 'The discord name is in an incorrect format',
        excludeEmptyString: true,
      }),
  })
  .required();

export const EmailValidation = yup
  .object({
    email: yup.string().trim().email('The email is not valid'),
  })
  .required();
