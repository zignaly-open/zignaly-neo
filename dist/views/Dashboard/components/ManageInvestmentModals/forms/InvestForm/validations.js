import BigNumber from 'bignumber.js';
import { numericFormatter } from 'react-number-format';
import i18n from 'util/i18next';
import * as yup from 'yup';
import { inputAmountTokenMaxValidation, inputAmountTokenDecimalsValidation, } from '../../../../../../util/validation';
export var investAmountValidation = function (max, coin) {
    return inputAmountTokenMaxValidation
        .concat(inputAmountTokenDecimalsValidation)
        .concat(yup.object().shape({
        value: yup
            .string()
            .test('sbt', i18n.t('edit-investment:invest-modal.max-reached'), function () { return parseFloat(max) > 0; })
            .test('sbt-limit', i18n.t('edit-investment:invest-modal.max-funds', {
            max: numericFormatter(max.toString(), {
                thousandSeparator: true,
            }),
            coin: coin,
        }), function (val) { return new BigNumber(val).isLessThanOrEqualTo(max); }),
    }));
};
export var EditInvestmentValidation = function (_a) {
    var max = _a.max, coin = _a.coin;
    return yup.object().shape({
        amountTransfer: investAmountValidation(max, coin),
        understandMargin: yup.boolean().oneOf([true], 'error:error.required'),
        transferConfirm: yup
            .string()
            .test('text-matches', 'edit-investment:invest-modal.transfer-error', function (value) {
            var _a;
            return (value.toLocaleLowerCase() ===
                ((_a = this.parent.transferLabelForValidation) === null || _a === void 0 ? void 0 : _a.toLocaleLowerCase()) ||
                this.parent.step === 1);
        }),
        understandMoneyTransferred: yup
            .boolean()
            .oneOf([true], 'error:error.required'),
    });
};
//# sourceMappingURL=validations.js.map