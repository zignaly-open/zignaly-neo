import * as yup from 'yup';
import { serviceNameValidation, successFeeValidation, } from '../../EditServiceProfileContainer/validations';
import { inputAmountTokenDecimalsValidation, inputAmountTokenMaxValidation, inputAmountTokenMinValidation, } from '../../../../../util/validation';
export var CreateServiceValidation = yup
    .object({
    serviceType: yup.string().required('error:error.required'),
    serviceName: serviceNameValidation,
    successFee: successFeeValidation,
    baseCurrency: yup.string().required('error:error.required'),
})
    .required();
export var InvestInYourServiceValidation = yup
    .object({
    amountToInvest: inputAmountTokenMaxValidation
        .concat(inputAmountTokenDecimalsValidation)
        .concat(inputAmountTokenMinValidation),
})
    .required();
//# sourceMappingURL=validations.js.map