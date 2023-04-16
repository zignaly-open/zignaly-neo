import React from 'react';
import { MarginContainer, WalletGradientIcon, ZigTypography, } from '@zignaly-open/ui';
import { Layout } from './styles';
import { useTitle } from 'react-use';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import { useBalanceQuery, useCoinsQuery, useSavingsQuery, } from 'apis/wallet/api';
import LayoutContentWrapper from 'components/LayoutContentWrapper';
import WalletTopPanel from './components/WalletTopPanel';
import WalletTransactions from './components/WalletTransactions';
import WalletCoinsTable from './components/WalletCoins';
var Wallet = function () {
    var t = useTranslation('wallet').t;
    useTitle(t('title'));
    var balancesEndpoint = useBalanceQuery();
    var coinsEndpoint = useCoinsQuery();
    var savingsEndpoint = useSavingsQuery();
    return (React.createElement(Layout, null,
        React.createElement(MarginContainer, null,
            React.createElement(LayoutContentWrapper, { endpoint: [coinsEndpoint, balancesEndpoint, savingsEndpoint], content: function (_a) {
                    var coins = _a[0], balances = _a[1], savings = _a[2];
                    return (React.createElement(React.Fragment, null,
                        React.createElement(Box, { display: 'flex', gap: 1, alignItems: 'center', color: 'neutral100' },
                            React.createElement(WalletGradientIcon, { width: 40, height: 40 }),
                            React.createElement(ZigTypography, { textTransform: 'uppercase', variant: 'h3' }, t('title'))),
                        React.createElement(WalletTopPanel, { balances: balances, savings: savings.total, coins: coins }),
                        React.createElement(WalletCoinsTable, { balances: balances, coins: coins }),
                        React.createElement(WalletTransactions, null)));
                } }))));
};
export default Wallet;
//# sourceMappingURL=index.js.map