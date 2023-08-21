import * as yup from 'yup';
import { passwordYup } from '../../Auth/components/SignupForm/validations';

export const UpdatePasswordValidation = yup
  .object({
    password: yup.string().required('error:error.required'),
    newPassword: passwordYup,
  })
  .required();
