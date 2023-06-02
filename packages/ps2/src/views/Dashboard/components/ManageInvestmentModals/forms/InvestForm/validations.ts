import BigNumber from 'bignumber.js';
import { numericFormatter } from 'react-number-format';
import i18n from 'util/i18next';
import * as yup from 'yup';
import {
  // inputAmountTokenMaxValidation,
  // inputAmountTokenDecimalsValidation,
  inputAmountValidation,
} from 'util/validation';

export const investAmountValidation = (
  max: string,
  coin: string,
  balance: string,
) =>
  inputAmountValidation({ balance, max, min: 100 })
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

// export const investAmountValidation = (max: string, coin: string) =>
//   inputAmountTokenMaxValidation
//     .concat(inputAmountTokenDecimalsValidation)
//     .concat(
//       yup.object().shape({
//         value: yup
//           .string()
//           .test(
//             'sbt',
//             i18n.t('edit-investment:invest-modal.max-reached'),
//             () => parseFloat(max) > 0,
//           )
//           .test(
//             'sbt-limit',
//             i18n.t('edit-investment:invest-modal.max-funds', {
//               max: numericFormatter(max.toString(), {
//                 thousandSeparator: true,
//               }),
//               coin,
//             }),
//             (val) => new BigNumber(val).isLessThanOrEqualTo(max),
//           ),
//       }),
//     );

export const EditInvestmentValidation = ({
  max,
  coin,
  balance,
}: {
  max: string;
  coin: string;
  balance: string;
}) =>
  yup.object().shape({
    // amountTransfer: investAmountValidation(max, coin),
    amountTransfer: investAmountValidation(max, coin, balance),
    understandMargin: yup.boolean().oneOf([true], 'error:error.required'),
    transferConfirm: yup
      .string()
      .test(
        'text-matches',
        'edit-investment:invest-modal.transfer-error',
        function (value) {
          return (
            value.toLocaleLowerCase() ===
              this.parent.transferLabelForValidation?.toLocaleLowerCase() ||
            this.parent.step === 1
          );
        },
      ),
    understandMoneyTransferred: yup
      .boolean()
      .oneOf([true], 'error:error.required'),
  });
