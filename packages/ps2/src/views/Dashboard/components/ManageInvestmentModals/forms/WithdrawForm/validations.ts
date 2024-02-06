import { CoinNetwork } from 'apis/coin/types';
import { precisionNumberToDecimals } from 'util/numbers';
import * as yup from 'yup';
import { inputAmountValidation } from 'util/validation';

// Let's hope this doesn't change in the future, or they add a better property
export const MEMO_SPECIAL_TIP =
  'Both a memo/tag and an address are required to successfully deposit your assets to Binance.';

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
    ...(network?.specialTips === MEMO_SPECIAL_TIP &&
      !network?.memoRegex && {
        tag: yup.string().required('withdraw-crypto:withdrawMemo.required'),
      }),
  });
};
