import BigNumber from 'bignumber.js';
import { numericFormatter } from 'react-number-format';
import i18n from 'util/i18next';
import * as yup from 'yup';
import {
  inputAmountTokenMaxValidation,
  inputAmountTokenDecimalsValidation,
} from '../../../../../../util/validation';

export const EditInvestmentValidation = ({
  max,
  coin,
}: {
  max: number;
  coin: string;
}) =>
  yup.object().shape({
    amountTransfer: inputAmountTokenMaxValidation
      .concat(inputAmountTokenDecimalsValidation)
      .concat(
        yup.object().shape({
          value: yup.string().test(
            'sbt',
            i18n.t('edit-investment:invest-modal.max-funds', {
              max: numericFormatter(max.toString(), {
                thousandSeparator: true,
              }),
              coin: coin,
            }),
            (val) => new BigNumber(val).isLessThanOrEqualTo(max),
          ),
        }),
      ),
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
