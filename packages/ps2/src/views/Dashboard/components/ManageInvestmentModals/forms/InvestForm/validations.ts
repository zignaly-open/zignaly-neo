import BigNumber from 'bignumber.js';
import { numericFormatter } from 'react-number-format';
import i18n from 'util/i18n/i18next';
import * as yup from 'yup';
import { inputAmountValidation } from 'util/validation';

export const investAmountValidation = ({
  min,
  max,
  coin,
  invested,
  balance,
}: {
  min?: number;
  max: string;
  coin: string;
  balance: string;
  invested?: number;
}) => {
  return inputAmountValidation({ balance, coin })
    .test(
      'min-investment',
      i18n.t('edit-investment:invest-modal.min-not-reached', {
        coin,
        value: min,
      }),
      (val) =>
        // we do not show this error when the user has invested anything
        !!invested ||
        !min ||
        (min > 0 &&
          new BigNumber(val)
            .plus(new BigNumber(invested))
            .isGreaterThanOrEqualTo(min)),
    )
    .test(
      'min-investment-invested',
      i18n.t('edit-investment:invest-modal.min-not-reached-invested', {
        coin,
        value: min,
        newMin: +new BigNumber(min).minus(new BigNumber(invested)).toString(),
      }),
      (val) =>
        !invested ||
        !min ||
        (invested > 0 &&
          min > 0 &&
          new BigNumber(val)
            .plus(new BigNumber(invested))
            .isGreaterThanOrEqualTo(min)),
    )
    .test(
      'sbt',
      i18n.t('edit-investment:invest-modal.max-reached'),
      () => parseFloat(max) > 0,
    )
    .test(
      'sbt-limit',
      i18n.t('edit-investment:invest-modal.max-funds', {
        max: numericFormatter(max.toString(), {
          thousandSeparator: true,
        }),
        coin,
      }),
      (val) => new BigNumber(val).isLessThanOrEqualTo(max),
    );
};

export const editInvestmentValidation = ({
  checkTransferInput = false,
  ...rest
}: Parameters<typeof investAmountValidation>[0] & {
  checkTransferInput?: boolean;
}) =>
  yup.object().shape({
    amountTransfer: investAmountValidation(rest),
    transferConfirm: yup
      .string()
      .test(
        'text-matches',
        'edit-investment:invest-modal.transfer-error',
        function (value) {
          return (
            !checkTransferInput ||
            value.toLocaleLowerCase() ===
              this.parent.transferLabelForValidation?.toLocaleLowerCase()
          );
        },
      ),
    understandRisk: yup.boolean().oneOf([true], 'error:error.required'),
  });
