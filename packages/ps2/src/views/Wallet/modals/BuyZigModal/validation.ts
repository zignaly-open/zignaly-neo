import * as yup from 'yup';
import { inputAmountTokenMaxValidation } from 'util/validation';
import i18n from 'util/i18next';
import BigNumber from 'bignumber.js';
import { numericFormatter } from 'react-number-format';

export const SwapValidation = (
  min: number,
  max: number,
  coin: string,
  timeForMaxDiff: number,
) =>
  yup.object({
    amount: inputAmountTokenMaxValidation.concat(
      yup.object().shape({
        value: yup
          .string()
          .test(
            'min',
            i18n.t('common:validation.min-amount', {
              amount: numericFormatter(min?.toString() ?? '', {}),
              coin,
            }),
            (val) => !min || new BigNumber(val).isGreaterThanOrEqualTo(min),
          )
          .test(
            'max',
            i18n.t(timeForMaxDiff ? 'wallet:buy.maxLeft' : 'wallet:buy.max', {
              amount: numericFormatter(max?.toString() ?? '', {}),
              coin,
              timeForMaxDiff,
            }),
            (val) => !max || new BigNumber(val).isLessThanOrEqualTo(max),
          ),
      }),
    ),
  });
