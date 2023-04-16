import React from 'react';
import { TransactionPanel, TypographyPanelLabel, TypographyPanelName, } from './styles';
import { Box } from '@mui/material';
import FromTo from '../FromTo';
import { ArrowRightAlt } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
var TransactionDetails = function (_a) {
    var transaction = _a.transaction;
    var t = useTranslation('transactions-history').t;
    return (React.createElement(TransactionPanel, null,
        React.createElement(Box, { display: 'flex', alignItems: 'center' },
            React.createElement(TypographyPanelLabel, null, t('details.from')),
            React.createElement(FromTo, { side: 'from', transaction: transaction }),
            React.createElement(ArrowRightAlt, { style: { margin: '0 21px' } }),
            React.createElement(TypographyPanelLabel, null, t('details.to')),
            React.createElement(FromTo, { side: 'to', transaction: transaction })),
        React.createElement(Box, { display: 'flex', alignItems: 'center' },
            React.createElement(TypographyPanelLabel, null, t('details.txHash')),
            React.createElement(TypographyPanelName, null, transaction.txId)),
        transaction.message && (React.createElement(Box, { display: 'flex', alignItems: 'center' },
            React.createElement(TypographyPanelLabel, null, t('details.note')),
            React.createElement(TypographyPanelName, null, transaction.message)))));
};
export default TransactionDetails;
//# sourceMappingURL=index.js.map