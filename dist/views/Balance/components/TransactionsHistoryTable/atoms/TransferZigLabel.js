import { ZignalyLogo } from '@zignaly-open/ui';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { TypographyPanelName } from './TransactionDetails/styles';
var ZignalyAccount = function (_a) {
    var name = _a.name;
    var t = useTranslation('transactions-history').t;
    return (React.createElement(React.Fragment, null,
        React.createElement(ZignalyLogo, { width: 24, height: 24, style: { marginRight: '16px' } }),
        React.createElement(TypographyPanelName, null, name || t('deleted'))));
};
export default ZignalyAccount;
//# sourceMappingURL=TransferZigLabel.js.map