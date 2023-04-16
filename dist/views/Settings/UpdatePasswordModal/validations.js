import * as yup from 'yup';
import { passwordYup } from '../../Auth/components/SignupForm/validations';
export var UpdatePasswordValidation = yup
    .object({
    password: yup.string().required('error:error.required'),
    newPassword: passwordYup,
})
    .required();
//# sourceMappingURL=validations.js.map