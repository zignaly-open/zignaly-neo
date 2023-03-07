import { CoinNetwork } from 'apis/ps2/coin/types';
import BigNumber from 'bignumber.js';
import { numericFormatter } from 'react-number-format';
import i18n from 'util/i18next';
import { precisionNumberToDecimals } from 'util/numbers';
import * as yup from 'yup';
import {
  decimalsValidation,
  inputAmountTokenMaxValidation,
} from '../../../../../../util/validation';

export const WithdrawValidation = (network: CoinNetwork) => {
  const amountDecimalsValidation =
    network?.integerMultiple &&
    decimalsValidation(precisionNumberToDecimals(network.integerMultiple));

  return yup.object({
    amount: inputAmountTokenMaxValidation.concat(
      yup.object().shape({
        value: yup
          .string()
          .test(
            'min',
            i18n.t('withdraw-crypto:validation.minWithdrawal', {
              value:
                network && numericFormatter(network.withdrawMin.toString(), {}),
              coin: network?.coin,
            }),
            (val) =>
              !network ||
              new BigNumber(val).isGreaterThanOrEqualTo(network.withdrawMin),
          )
          .concat(amountDecimalsValidation),
      }),
    ),
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
  });
};
