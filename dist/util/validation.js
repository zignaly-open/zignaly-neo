import * as yup from 'yup';
import BigNumber from 'bignumber.js';
export var checkDecimals = function (val, maxDecimals) {
    if (!val)
        return true;
    var splitValueDot = val.toString().split('.');
    if (splitValueDot.length > 2)
        return false;
    var decimals = splitValueDot.length === 1 ? 0 : splitValueDot[1].length;
    return decimals <= maxDecimals;
};
export var decimalsValidation = function (maxDecimals) {
    return yup
        .string()
        .test('int', 'common:validation.max-decimals', function (val) {
        return checkDecimals(val, maxDecimals);
    });
};
export var decimalsValidationNumber = function (maxDecimals) {
    return yup
        .number()
        .typeError('common:validation.invalid-value')
        .test('int', 'common:validation.max-decimals', function (val) {
        return checkDecimals(val, maxDecimals);
    });
};
var inputAmountNumberValidation = yup
    .string()
    .required('common:validation.invalid-amount')
    .test('int', 'common:validation.invalid-value', function (val) {
    return String(val)[String(val).length - 1] !== '.';
})
    .test('max', 'common:validation.invalid-value', function (val) {
    return !new BigNumber(val).isNaN();
});
var inputAmountNumberValidationGt0 = inputAmountNumberValidation.test('min', 'common:validation.negative-amount', function (val) {
    return new BigNumber(val).gt(0);
});
var inputAmountNumberValidationGte0 = inputAmountNumberValidation.test('min', 'common:validation.negative-zeroable-amount', function (val) {
    return new BigNumber(val).gte(0);
});
var inputAmountNumberValidationMaxToken = inputAmountNumberValidationGt0.test('number', 'common:validation.insufficient-amount', function (val) {
    var _a, _b;
    var tokenBalance = new BigNumber((_b = (_a = this.parent) === null || _a === void 0 ? void 0 : _a.token) === null || _b === void 0 ? void 0 : _b.balance);
    var currentValue = new BigNumber(val);
    return !currentValue.isGreaterThan(tokenBalance);
});
export var inputAmountMinOwnerInvested = function (minInvestedAmount) {
    return yup
        .string()
        .test('number', 'common:validation.min-invest-amount-for-owner', function (val) {
        var _a, _b;
        var tokenBalance = new BigNumber((_b = (_a = this.parent) === null || _a === void 0 ? void 0 : _a.token) === null || _b === void 0 ? void 0 : _b.balance);
        var currentValue = new BigNumber(val);
        var minBalance = new BigNumber(minInvestedAmount);
        return tokenBalance
            .minus(currentValue)
            .isGreaterThanOrEqualTo(minBalance);
    });
};
export var inputAmountMinOwnerInvestedValidation = function (minAmount) {
    return yup.object().shape({
        value: inputAmountMinOwnerInvested(minAmount),
    });
};
var inputAmountNumberValidationMinToken = inputAmountNumberValidationGt0.test('number', 'common:validation.insufficient-amount-min', function (val) {
    var _a, _b;
    var minValue = new BigNumber((_b = (_a = this.parent) === null || _a === void 0 ? void 0 : _a.token) === null || _b === void 0 ? void 0 : _b.min);
    var currentValue = new BigNumber(val);
    return !currentValue.isLessThan(minValue);
});
export var inputAmountTokenValidation = yup.object().shape({
    value: inputAmountNumberValidationGt0,
});
export var inputAmountZeroableValidation = yup.object().shape({
    value: inputAmountNumberValidationGte0,
});
export var inputAmountTokenMaxValidation = yup.object().shape({
    value: inputAmountNumberValidationMaxToken,
});
export var inputAmountTokenMinValidation = yup.object().shape({
    value: inputAmountNumberValidationMinToken,
});
export var inputAmountTokenDecimalsValidation = yup.object().shape({
    value: decimalsValidation(8),
});
//# sourceMappingURL=validation.js.map