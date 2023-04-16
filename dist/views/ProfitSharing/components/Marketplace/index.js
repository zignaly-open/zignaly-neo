var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import React, { useMemo } from 'react';
import { useMarketplace } from '../../../../apis/marketplace/use';
import { useTranslation } from 'react-i18next';
import { PageContainer, PercentageIndicator, ZigTypography, ZigTable, createColumnHelper, ZigChartMini, } from '@zignaly-open/ui';
import { Box } from '@mui/material';
import LayoutContentWrapper from '../../../../components/LayoutContentWrapper';
import { ServiceName } from '../../../Dashboard/components/ServiceName';
import { marketplaceServiceToInvestmentType } from '../../../../apis/marketplace/util';
import AssetsInPool from '../../../../components/AssetsInPool';
import MarketplaceAction from '../MarketplaceAction';
import { TableWrapper } from './styles';
var Marketplace = function () {
    var marketplaceEndpoint = useMarketplace();
    var t = useTranslation('marketplace').t;
    var columnHelper = createColumnHelper();
    var columns = useMemo(function () { return [
        columnHelper.accessor('name', {
            id: 'service-name',
            header: t('table.service-name'),
            style: {
                justifyContent: 'flex-start',
                paddingLeft: '88px',
            },
            meta: {
                subtitle: (React.createElement(React.Fragment, null,
                    React.createElement(Box, { textAlign: 'left' }, t('table.manager')),
                    React.createElement(Box, { textAlign: 'left' }, t('table.currency')))),
            },
            cell: function (props) { return (React.createElement(ServiceName, { prefixId: "marketplace-table", service: marketplaceServiceToInvestmentType(props.row.original) })); },
        }),
        columnHelper.accessor('investedUSDT', {
            id: 'investedUSDT',
            header: t('table.assets'),
            meta: {
                subtitle: (React.createElement(React.Fragment, null,
                    React.createElement("div", null, t('table.nb-investors')),
                    React.createElement("div", null, t('table.account-age')))),
            },
            cell: function (props) { return (React.createElement(Box, { minWidth: 148, id: "marketplace-table__assets-".concat(props.row.original.id) },
                React.createElement(AssetsInPool, { prefixId: 'marketplace-table', serviceId: props.row.original.id, assetsValue: props.getValue(), numberOfInvestors: props.row.original.investors, createdAt: props.row.original.createdAt }))); },
            sortingFn: 'alphanumeric',
        }),
        columnHelper.accessor(function (row) { return Number(row.pnlPercent90t); }, {
            id: 'pnlPercent90t',
            header: t('table.n-months-pnl', { count: 3 }),
            cell: function (props) { return (React.createElement(Box, { id: "marketplace-table__pnl90t-".concat(props.row.original.id) },
                React.createElement(PercentageIndicator, { style: {
                        fontSize: '18px',
                        lineHeight: '28px',
                    }, value: props.getValue() }))); },
        }),
        columnHelper.accessor(function (row) { return Number(row.pnlPercent30t); }, {
            id: 'pnlPercent30t',
            header: t('table.n-months-pnl', { count: 1 }),
            cell: function (props) { return (React.createElement(Box, { id: "marketplace-table__pnl30t-".concat(props.row.original.id) }, +props.getValue() ||
                Object.keys(props.row.original.sparklines).length > 1 ? (React.createElement(React.Fragment, null,
                React.createElement(ZigChartMini, { midLine: true, data: __spreadArray([0], props.row.original.sparklines, true) }),
                React.createElement(PercentageIndicator, { value: props.getValue(), type: 'graph' }))) : (React.createElement(ZigTypography, { variant: 'body2', color: 'neutral400' }, t('tableHeader.1-mo.no-data'))))); },
        }),
        columnHelper.display({
            header: '',
            id: 'action',
            cell: function (props) { return React.createElement(MarketplaceAction, { service: props.row.original }); },
        }),
    ]; }, [t]);
    return (React.createElement(PageContainer, null,
        React.createElement(LayoutContentWrapper, { endpoint: marketplaceEndpoint, content: function (services) { return (React.createElement(React.Fragment, null,
                React.createElement(Box, { sx: {
                        textAlign: 'center',
                        mt: 4,
                        mb: 4,
                    } },
                    React.createElement(ZigTypography, { variant: 'h1', id: 'marketplace__title', lineHeight: '42px' }, t('invest-in-services')),
                    React.createElement(ZigTypography, { variant: 'body1', id: 'marketplace__description', color: 'neutral300' }, t('invest-in-services-explainer'))),
                React.createElement(TableWrapper, null,
                    React.createElement(ZigTable, { prefixId: 'marketplace', initialState: {
                            sorting: [
                                {
                                    id: 'pnlPercent90t',
                                    desc: true,
                                },
                            ],
                        }, columns: columns, data: services, emptyMessage: t('table-search-emptyMessage'), columnVisibility: false, enableSortingRemoval: false })))); } })));
};
export default Marketplace;
//# sourceMappingURL=index.js.map