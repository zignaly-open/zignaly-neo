import * as yup from 'yup';
export var ForgotPasswordValidation = yup
    .object({
    email: yup
        .string()
        .required('error:error.required')
        .email('error:error.email-invalid'),
})
    .required();
//# sourceMappingURL=validations.js.map