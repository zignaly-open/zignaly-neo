import * as yup from 'yup';
import { passwordYup } from '../SignupForm/validations';

export const UpdatePasswordValidation = yup
  .object({
    code: yup.string().required('error:error.required'),
  })
  .required();
