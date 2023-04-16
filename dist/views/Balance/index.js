import React, { useCallback, useState } from 'react';
import { MarginContainer, PageContainer, TextButton, ZigButton, ZigTab, ZigTabPanel, ZigTabs, } from '@zignaly-open/ui';
import MyBalancesTable from './components/MyBalancesTable';
import TransactionHistoryTable from './components/TransactionsHistoryTable';
import BalanceAccountSelector from './components/BalanceAccountSelector';
import { Header, StyledZigSelect } from './styles';
import { useTitle } from 'react-use';
import { useTranslation } from 'react-i18next';
import { Add, OpenInNew } from '@mui/icons-material';
import ExportModal from './components/ExportModal';
import { useZModal } from 'components/ZModal/use';
import { Box } from '@mui/material';
import { TRANSACTION_TYPE } from 'apis/coin/types';
import { TRANSACTION_TYPE_NAME } from './components/TransactionsHistoryTable/types';
import createZModalRouteElement from '../../components/ZModal/ZModalRoute';
import DepositModal from '../Dashboard/components/ManageInvestmentModals/DepositModal';
var MyBalances = function () {
    var t = useTranslation([
        'pages',
        'my-balances',
        'transactions-history',
    ]).t;
    useTitle(t('my-balances'));
    var _a = useState(0), tab = _a[0], setTab = _a[1];
    var _b = useState('all'), type = _b[0], setType = _b[1];
    var showModal = useZModal().showModal;
    var filterOptions = [
        { value: 'all', label: t('transactions-history:filter.all') },
    ].concat(Object.entries(TRANSACTION_TYPE).map(function (_a) {
        var v = _a[1];
        return {
            value: v,
            label: t("transactions-history:".concat(TRANSACTION_TYPE_NAME[v])),
        };
    }));
    var maxLegend = useCallback(function (_, state) { return ({
        display: state.selectProps.menuIsOpen ? 'none' : 'inline-block',
        textAlign: 'center',
        ':after': {
            content: "'\\A ".concat(t('transactions-history:filter.max'), "'"),
            whiteSpace: 'pre',
        },
    }); }, [t]);
    return (React.createElement(PageContainer, { className: 'withSubHeader' },
        React.createElement(MarginContainer, null,
            React.createElement(Header, { sx: {} },
                React.createElement(Box, { sx: { flex: '0 0 100px' } }),
                React.createElement(BalanceAccountSelector, null),
                React.createElement(Box, { sx: { flex: '0 0 100px' } },
                    React.createElement(ZigButton, { id: 'balances__deposit-header', startIcon: React.createElement(Add, null), sx: { fontWeight: 600, mb: 1 }, variant: 'contained', onClick: function () {
                            return showModal(DepositModal, {
                                ctaId: 'balance-deposit-header-button',
                            });
                        } }, t('action:deposit')))),
            React.createElement(Box, { height: '67px', display: 'flex', alignItems: 'center' },
                React.createElement(ZigTabs, { onChange: function (_, newValue) {
                        setTab(newValue);
                    }, value: tab },
                    React.createElement(ZigTab, { label: t('my-balances:my-coins'), id: 'balance__my-coins' }),
                    React.createElement(ZigTab, { id: 'balance__deposits-withdrawals', label: t('my-balances:deposits-withdrawals'), asideComponent: React.createElement(Box, { display: 'flex', gap: 2 },
                            React.createElement(TextButton, { id: 'balance__export', rightElement: React.createElement(OpenInNew, { sx: { color: 'links', width: '15px' } }), caption: t('action:export'), onClick: function () {
                                    showModal(ExportModal, {
                                        type: type !== 'all' ? type : null,
                                    });
                                } }),
                            React.createElement(StyledZigSelect, { options: filterOptions, value: type, onChange: setType, styles: {
                                    singleValue: maxLegend,
                                } })) }))),
            React.createElement(ZigTabPanel, { value: tab, index: 0 },
                React.createElement(MyBalancesTable, null)),
            React.createElement(ZigTabPanel, { value: tab, index: 1 },
                React.createElement(TransactionHistoryTable, { type: type !== 'all' ? type : null })))));
};
export default MyBalances;
export var MyBalancesDeposit = createZModalRouteElement({
    component: DepositModal,
    ctaId: 'balances-table-row',
});
//# sourceMappingURL=index.js.map