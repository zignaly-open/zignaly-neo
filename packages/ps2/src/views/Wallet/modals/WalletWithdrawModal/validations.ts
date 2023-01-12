import { WalletNetwork } from 'apis/wallet/types';
import BigNumber from 'bignumber.js';
import { numericFormatter } from 'react-number-format';
import i18n from 'util/i18next';
import { inputAmountTokenMaxValidation } from 'util/validation';
import * as yup from 'yup';

export const WithdrawValidation = (
  network: WalletNetwork,
  min: number,
  coin: string,
) => {
  return yup.object({
    amount: inputAmountTokenMaxValidation.concat(
      yup.object().shape({
        value: yup.string().test(
          'min',
          i18n.t('withdraw-crypto:validation.minWithdrawal', {
            value: network && numericFormatter(min.toString(), {}),
            coin,
          }),
          (val) => !min || new BigNumber(val).isGreaterThanOrEqualTo(min),
        ),
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
