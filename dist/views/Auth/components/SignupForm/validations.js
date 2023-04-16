import * as yup from 'yup';
import i18n from 'util/i18next';
var specialRegex = /[`!@#$%^&*()_+\-=[\]{};':"|,.<>/?~\\]/;
var PASSWORD_LENGTH = 8;
export var passwordYup = yup
    .string()
    .required('error:error.required')
    .min(PASSWORD_LENGTH, function () {
    return i18n.t('error:error.password-requirements', {
        length: PASSWORD_LENGTH,
    });
})
    .matches(specialRegex, function () {
    return i18n.t('error:error.password-requirements', {
        length: PASSWORD_LENGTH,
    });
})
    .matches(/[a-zA-Z]/, function () {
    return i18n.t('error:error.password-requirements', {
        length: PASSWORD_LENGTH,
    });
})
    .matches(/\d/, function () {
    return i18n.t('error:error.password-requirements', {
        length: PASSWORD_LENGTH,
    });
});
export var SignupValidation = yup
    .object({
    email: yup
        .string()
        .required('error:error.required')
        .email('error:error.email-invalid'),
    password: passwordYup,
})
    .required();
//# sourceMappingURL=validations.js.map