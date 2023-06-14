import * as yup from 'yup';
import {
  serviceNameValidation,
  successFeeValidation,
} from '../../EditServiceProfileContainer/validations';
import { inputAmountValidation } from '../../../../../util/validation';

export const CreateServiceValidation = yup
  .object({
    serviceType: yup.string().required('error:error.required'),
    serviceName: serviceNameValidation,
    successFee: successFeeValidation,
    baseCurrency: yup.string().required('error:error.required'),
  })
  .required();

export const InvestInYourServiceValidation = ({
  maxDecimals,
  min,
  coin,
  balance,
}: {
  maxDecimals: number;
  min: number;
  coin: string;
  balance: string;
}) =>
  yup
    .object()
    .shape({
      amountToInvest: inputAmountValidation({
        balance,
        coin,
        min: min,
        maxDecimals: maxDecimals,
      }),
    })
    .required();
