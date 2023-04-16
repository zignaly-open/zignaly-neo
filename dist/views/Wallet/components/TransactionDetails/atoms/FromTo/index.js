import React from 'react';
import ZignalyAccount from 'views/Balance/components/TransactionsHistoryTable/atoms/TransferZigLabel';
import ChainIcon from 'components/ChainIcon';
import { TypographyPanelName } from 'views/Balance/components/TransactionsHistoryTable/atoms/TransactionDetails/styles';
import { Box } from '@mui/material';
import ServiceLink from 'views/Balance/components/TransactionsHistoryTable/atoms/ProviderLink';
var FromTo = function (_a) {
    var transaction = _a.transaction, side = _a.side;
    var fromAddress = transaction.fromAddress, toAddress = transaction.toAddress, fromName = transaction.fromName, toName = transaction.toName, providerId = transaction.providerId, network = transaction.network, providerName = transaction.providerName;
    var isWithdrawal = transaction.formattedAmount.startsWith('-');
    var address = isWithdrawal ? toAddress : fromAddress;
    var name = isWithdrawal ? toName : fromName;
    if ((side === 'from' && isWithdrawal) || (side === 'to' && !isWithdrawal)) {
        return React.createElement(ZignalyAccount, { name: 'ZIG Wallet' });
    }
    return transaction.zigpadId ? (React.createElement(React.Fragment, null,
        React.createElement("img", { src: transaction.zigpadLogo, width: 24, height: 24, style: { margin: '0 8px 0 16px' } }),
        React.createElement(TypographyPanelName, null, transaction.zigpadName))) : address ? (React.createElement(Box, { gap: 2, display: 'flex', alignItems: 'center' },
        React.createElement(ChainIcon, { network: network }),
        React.createElement(TypographyPanelName, null, address))) : providerId ? (React.createElement(React.Fragment, null,
        React.createElement(TypographyPanelName, null, providerId ? (React.createElement(ServiceLink, { serviceId: providerId, serviceName: providerName, servicePsVersion: 2 })) : (address)))) : (React.createElement(ZignalyAccount, { name: name }));
};
export default FromTo;
//# sourceMappingURL=index.js.map