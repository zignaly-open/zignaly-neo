import React, { useMemo } from 'react';
import { TransactionContainer } from '../styles';
import { ArrowLeftIcon, Button, ZigTable, ZigTablePriceLabel, } from '@zignaly-open/ui';
import { EditInvestmentViews, } from '../types';
import { useTranslation } from 'react-i18next';
import { useCurrentBalance, useInvestmentDetails, useSelectedInvestment, } from '../../../../../apis/investment/use';
import { ModalActions } from 'components/ZModal/ModalContainer/styles';
var PendingTransactionsList = function (_a) {
    var setView = _a.setView;
    var serviceId = useSelectedInvestment().serviceId;
    var details = useInvestmentDetails(serviceId).data;
    var t = useTranslation('edit-investment').t;
    var coin = useCurrentBalance();
    var pendingTransactionsList = useMemo(function () {
        var fields = [];
        if (!details) {
            return fields;
        }
        if (details.pending > 0) {
            fields.push({
                amount: details.pending,
                type: t('pendingMajorThan.type'),
                status: t('pendingMajorThan.status'),
            });
        }
        if (details.profitOut > 0) {
            fields.push({
                amount: details.profitOut,
                type: t('profitOutMajorThan.type'),
                status: t('profitOutMajorThan.status'),
            });
        }
        if (details.transferOut > 0) {
            fields.push({
                amount: details.transferOut,
                type: t('transferOutMajorThan.type'),
                status: t('transferOutMajorThan.status'),
            });
        }
        return fields;
    }, [details === null || details === void 0 ? void 0 : details.pending, details === null || details === void 0 ? void 0 : details.transferOut, details === null || details === void 0 ? void 0 : details.profitOut, coin, t]);
    return (React.createElement(React.Fragment, null,
        React.createElement(TransactionContainer, null,
            React.createElement(ZigTable, { prefixId: 'pending-transactions', columns: [
                    {
                        header: t('modal.pendingTransaction.tableHeader.amount'),
                        accessorKey: 'amount',
                        cell: function (props) { return (React.createElement(ZigTablePriceLabel, { coin: coin.id, value: props.getValue() })); },
                        sortingFn: 'alphanumeric',
                    },
                    {
                        header: t('modal.pendingTransaction.tableHeader.type'),
                        accessorKey: 'type',
                    },
                    {
                        header: t('modal.pendingTransaction.tableHeader.status'),
                        accessorKey: 'status',
                    },
                ], data: pendingTransactionsList, columnVisibility: false, pagination: false })),
        React.createElement(ModalActions, null,
            React.createElement(Button, { id: 'pending__pending-transactions', leftElement: React.createElement(ArrowLeftIcon, { color: '#fff', width: '20px', height: '20px' }), onClick: function () { return setView(EditInvestmentViews.EditInvestment); }, size: 'large', caption: t('modal.pendingTransaction.button') }))));
};
export default PendingTransactionsList;
//# sourceMappingURL=PendingTransactionsList.js.map