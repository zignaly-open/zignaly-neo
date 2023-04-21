import * as yup from 'yup';
import { passwordYup } from '../SignupForm/validations';

export const ResetPasswordValidation = yup
  .object({
    password: passwordYup,
  })
  .required();
