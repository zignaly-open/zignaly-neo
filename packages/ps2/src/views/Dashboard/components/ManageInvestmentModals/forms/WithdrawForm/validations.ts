import * as yup from 'yup';
import { inputAmountTokenMaxValidation } from '../../../../../../util/validation';

export const WithdrawValidation = (addressRegex: string, memoRegex: string) =>
  yup.object().shape({
    amount: inputAmountTokenMaxValidation,
    address: yup
      .string()
      .matches(RegExp(addressRegex), 'withdraw-crypto:withdrawAddress.invalid'),
    // .test(
    //   'format',
    //   'withdraw-crypto:withdrawAddress.invalid',
    //   function (value) {
    //     return RegExp(addressRegex).test(value);

    //     // this.parent.step === 1
    //   },
    // ),
  });
