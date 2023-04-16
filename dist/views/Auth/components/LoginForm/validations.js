import * as yup from 'yup';
export var LoginValidation = yup
    .object({
    email: yup
        .string()
        .required('error:error.required')
        .email('error:error.email-invalid'),
    password: yup.string().required('error:error.required'),
})
    .required();
//# sourceMappingURL=validations.js.map