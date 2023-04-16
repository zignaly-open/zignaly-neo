import * as yup from 'yup';
export var TwoFAValidation = yup
    .object({
    code: yup
        .string()
        .required('error:error.required')
        .typeError('common:validation.invalid-value')
        .test('value', 'common:validation.invalid-value', function (v) { return Number.isInteger(Number(v)) && (v === null || v === void 0 ? void 0 : v.length) === 6; }),
})
    .required();
//# sourceMappingURL=validations.js.map