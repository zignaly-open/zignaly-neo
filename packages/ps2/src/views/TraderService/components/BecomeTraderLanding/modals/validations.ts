import * as yup from 'yup';
import {
  serviceNameValidation,
  successFeeValidation,
} from '../../EditServiceProfileContainer/validations';

export const CreateServiceValidation = yup
  .object({
    serviceType: yup.string().required('error:error.required'),
    serviceName: serviceNameValidation,
    successFee: successFeeValidation,
    baseCurrency: yup.string().required('error:error.required'),
  })
  .required();
