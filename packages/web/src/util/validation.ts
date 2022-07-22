import * as yup from 'yup';

export const UserSettingsValidation = yup
  .object({
    username: yup
      .string()
      .trim()
      .matches(/^[a-zA-Z0-9-._]{2,20}$/, 'The username is incorrect format'),
    discordName: yup
      .string()
      .trim()
      .matches(/^.{3,32}#[0-9]{4}$/, 'The discord name is incorrect format'),
  })
  .required();
