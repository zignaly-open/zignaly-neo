import { ZigTypography } from '@zignaly-open/ui';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { transactionStateName, transactionStateColor } from './types';
var TransactionStateLabel = function (_a) {
    var state = _a.state;
    var t = useTranslation('transactions-history').t;
    return (React.createElement(ZigTypography, { color: transactionStateColor[state] }, t(transactionStateName[state])));
};
export default TransactionStateLabel;
//# sourceMappingURL=index.js.map