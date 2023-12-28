import { CoinNetwork } from 'apis/coin/types';
import { precisionNumberToDecimals } from 'util/numbers';
import * as yup from 'yup';
import { inputAmountValidation } from 'util/validation';

export const withdrawAmountValidation = (
  coin: string,
  balance: string,
  network: CoinNetwork,
) => {
  return yup.object().shape({
    amount: inputAmountValidation({
      balance,
      coin,
      min: network?.withdrawMin,
      maxDecimals: network
        ? precisionNumberToDecimals(network.integerMultiple)
        : undefined,
    }),
    network: yup.string().required(),
    address: yup
      .string()
      .required('withdraw-crypto:validation.indicateAnAddress')
      .matches(
        RegExp(network?.addressRegex),
        'withdraw-crypto:withdrawAddress.invalid',
      ),
    ...(network?.memoRegex && {
      tag: yup
        .string()
        .required('error:error.required')
        .matches(
          RegExp(network.memoRegex),
          'withdraw-crypto:withdrawMemo.invalid',
        ),
    }),
    ...(network?.specialTips &&
      !network?.memoRegex && {
        tag: yup.string().required('withdraw-crypto:withdrawMemo.required'),
      }),
  });
};
