import * as yup from 'yup';
import { inputAmountTokenMaxValidation } from '../../../../../../util/validation';

export const WithdrawValidation = (addressRegex: string, memoRegex: string) =>
  yup.object({
    amount: inputAmountTokenMaxValidation,
    network: yup.string().required(),
    address: yup
      .string()
      .required('error:error.required')
      .matches(RegExp(addressRegex), 'withdraw-crypto:withdrawAddress.invalid'),
    ...(memoRegex && {
      tag: yup
        .string()
        .required('error:error.required')
        .matches(RegExp(memoRegex), 'withdraw-crypto:withdrawMemo.invalid'),
    }),
  });
