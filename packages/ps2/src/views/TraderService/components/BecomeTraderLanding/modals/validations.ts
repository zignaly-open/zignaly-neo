import * as yup from 'yup';
import {
  serviceNameValidation,
  successFeeValidation,
} from '../../EditServiceProfileContainer/validations';
import {
  inputAmountTokenDecimalsValidation,
  inputAmountTokenMaxValidation,
} from '../../../../../util/validation';

export const CreateServiceValidation = yup
  .object({
    serviceType: yup.string().required('error:error.required'),
    serviceName: serviceNameValidation,
    successFee: successFeeValidation,
    baseCurrency: yup.string().required('error:error.required'),
  })
  .required();

export const InvestInYourServiceValidation = yup
  .object({
    amountToInvest: inputAmountTokenMaxValidation.concat(
      inputAmountTokenDecimalsValidation,
    ),
  })
  .required();
