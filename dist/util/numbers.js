import BigNumber from 'bignumber.js';
export var sortBigNumbers = function (a, b) {
    a = new BigNumber(a);
    b = new BigNumber(b);
    if (a.isGreaterThan(b))
        return 1;
    if (a.isLessThan(b))
        return -1;
    return 0;
};
export var precisionNumberToDecimals = function (integerMultiple) {
    var integerMultipleFloat = parseFloat(integerMultiple);
    return integerMultipleFloat > 1
        ? 0
        : Math.abs(Math.log10(integerMultipleFloat));
};
export var stringSort = function (a, b) { return a.localeCompare(b); };
export var getColorForNumber = function (value) {
    return +value === 0 ? undefined : +value > 0 ? 'greenGraph' : 'redGraphOrError';
};
//# sourceMappingURL=numbers.js.map