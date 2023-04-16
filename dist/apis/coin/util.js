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
export var mergeCoinsAndBalances = function (coins, balances) {
    return Object.entries(balances || {}).reduce(function (acc, _a) {
        var _b;
        var coin = _a[0], balance = _a[1];
        acc = __assign(__assign({}, acc), (_b = {}, _b[coin] = __assign(__assign({}, balance), coins[coin]), _b));
        return acc;
    }, {});
};
//# sourceMappingURL=util.js.map