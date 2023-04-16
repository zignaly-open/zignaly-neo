import React from 'react';
import { Box } from '@mui/material';
import ServiceLink from '../ProviderLink';
import ZignalyAccount from '../TransferZigLabel';
import { useTranslation } from 'react-i18next';
import { TypographyPanelName } from '../TransactionDetails/styles';
import ChainIcon from 'components/ChainIcon';
import { getTransactionSideType } from '../../util';
var FromTo = function (_a) {
    var transaction = _a.transaction, side = _a.side;
    var from = transaction.from, to = transaction.to, fromName = transaction.fromName, toName = transaction.toName, network = transaction.network, txType = transaction.txType, servicePsVersion = transaction.servicePsVersion;
    var idAddress = side === 'to' ? to : from;
    var name = side === 'to' ? toName : fromName;
    var sideType = getTransactionSideType(txType, side);
    var t = useTranslation('transactions-history').t;
    return sideType === 'service' ? (React.createElement(ServiceLink, { serviceId: idAddress, serviceName: name, servicePsVersion: servicePsVersion })) : sideType === 'external' ? (React.createElement(React.Fragment, null,
        React.createElement(Box, { mr: 2 },
            React.createElement(ChainIcon, { network: network })),
        React.createElement(TypographyPanelName, null, idAddress || t('external')))) : (React.createElement(ZignalyAccount, { name: name }));
};
export default FromTo;
//# sourceMappingURL=index.js.map