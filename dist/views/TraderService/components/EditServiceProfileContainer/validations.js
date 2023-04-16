import { decimalsValidationNumber } from 'util/validation';
import * as yup from 'yup';
var nameRegex = /^[a-zA-Z0-9 $._#&|()\[\]%-]*$/;
var letterNumberRegex = /[a-zA-Z0-9]/;
export var successFeeValidation = yup
    .number()
    .typeError('service:edit.validation.success-fee-range')
    .required('error:error.required')
    .test('integer', 'service:edit.validation.success-fee-range', function (v) {
    return Number.isInteger(v);
})
    .test('range', 'service:edit.validation.success-fee-range', function (v) { return !v || (v >= 10 && v <= 75); });
export var serviceNameValidation = yup
    .string()
    .required('error:error.required')
    .matches(nameRegex, 'common:validation.invalid-characters')
    .matches(letterNumberRegex, 'common:validation.letter-number')
    .min(5, 'service:edit.validation.name-length')
    .max(50, 'service:edit.validation.name-length');
export var EditServiceValidation = yup
    .object({
    name: serviceNameValidation,
    successFee: successFeeValidation,
    maximumSbt: yup
        .number()
        .typeError('common:validation.invalid-value')
        .required('error:error.required')
        .positive('common:validation.negative-zeroable-amount')
        .concat(decimalsValidationNumber(8)),
})
    .required();
//# sourceMappingURL=validations.js.map