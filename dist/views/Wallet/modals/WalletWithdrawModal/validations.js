var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import BigNumber from 'bignumber.js';
import { numericFormatter } from 'react-number-format';
import i18n from 'util/i18next';
import { decimalsValidation, inputAmountTokenMaxValidation, } from 'util/validation';
import * as yup from 'yup';
export var WithdrawValidation = function (network, min, coin) {
    return yup.object(__assign({ amount: inputAmountTokenMaxValidation.concat(yup.object().shape({
            value: yup
                .string()
                .test('min', i18n.t('withdraw-crypto:validation.minWithdrawal', {
                value: network && numericFormatter(min.toString(), {}),
                coin: coin,
            }), function (val) { return !min || new BigNumber(val).isGreaterThanOrEqualTo(min); })
                .concat(decimalsValidation(8)),
        })), network: yup.string().required(), address: yup
            .string()
            .required('withdraw-crypto:validation.indicateAnAddress')
            .matches(RegExp(network === null || network === void 0 ? void 0 : network.addressRegex), 'withdraw-crypto:withdrawAddress.invalid') }, ((network === null || network === void 0 ? void 0 : network.memoRegex) && {
        tag: yup
            .string()
            .required('error:error.required')
            .matches(RegExp(network.memoRegex), 'withdraw-crypto:withdrawMemo.invalid'),
    })));
};
//# sourceMappingURL=validations.js.map