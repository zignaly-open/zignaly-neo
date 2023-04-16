import { TRANSACTION_TYPE } from 'apis/coin/types';
export var truncateAddress = function (address) {
    return address ? "".concat(address.slice(0, 6), "...").concat(address.slice(-4)) : '';
};
export var getTransactionSideType = function (txType, side) {
    if ((txType === TRANSACTION_TYPE.PS_DEPOSIT && side === 'to') ||
        ([
            TRANSACTION_TYPE.PS_WITHDRAW,
            TRANSACTION_TYPE.PSDS,
            TRANSACTION_TYPE.SUCCESS_FEE,
        ].includes(txType) &&
            side === 'from')) {
        return 'service';
    }
    if ((txType === TRANSACTION_TYPE.DEPOSIT && side === 'from') ||
        (txType === TRANSACTION_TYPE.WITHDRAW && side === 'to')) {
        return 'external';
    }
    return 'zignaly';
};
//# sourceMappingURL=util.js.map