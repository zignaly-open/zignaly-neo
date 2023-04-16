import * as yup from 'yup';
import { passwordYup } from '../SignupForm/validations';
export var ResetPasswordValidation = yup
    .object({
    password: passwordYup,
})
    .required();
//# sourceMappingURL=validations.js.map