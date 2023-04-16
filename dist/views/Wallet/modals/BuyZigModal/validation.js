import * as yup from 'yup';
import { decimalsValidation, inputAmountTokenMaxValidation, } from 'util/validation';
import i18n from 'util/i18next';
import BigNumber from 'bignumber.js';
import { numericFormatter } from 'react-number-format';
export var SwapValidation = function (min, max, coin, timeForMaxDiff) {
    var _a, _b;
    return yup.object({
        amount: inputAmountTokenMaxValidation.concat(yup.object().shape({
            value: yup
                .string()
                .test('min', i18n.t('common:validation.min-amount', {
                amount: numericFormatter((_a = min === null || min === void 0 ? void 0 : min.toString()) !== null && _a !== void 0 ? _a : '', {}),
                coin: coin,
            }), function (val) { return !min || new BigNumber(val).isGreaterThanOrEqualTo(min); })
                .test('max', i18n.t(timeForMaxDiff ? 'wallet:buy.maxLeft' : 'wallet:buy.max', {
                amount: numericFormatter((_b = max === null || max === void 0 ? void 0 : max.toString()) !== null && _b !== void 0 ? _b : '', {}),
                coin: coin,
                timeForMaxDiff: timeForMaxDiff,
            }), function (val) { return !max || new BigNumber(val).isLessThanOrEqualTo(max); })
                .concat(decimalsValidation(8)),
        })),
    });
};
//# sourceMappingURL=validation.js.map