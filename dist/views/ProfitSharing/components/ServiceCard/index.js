import { Box } from '@mui/material';
import { PercentageIndicator, ZigChartMini, ZigTypography, } from '@zignaly-open/ui';
import { marketplaceServiceToInvestmentType } from 'apis/marketplace/util';
import AssetsInPool from 'components/AssetsInPool';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ServiceName } from 'views/Dashboard/components/ServiceName';
import MarketplaceAction from '../MarketplaceAction';
import { ValueContainer, Card, BottomPnLContainer, ButtonContainer, AssetContainer, ChartBox, } from './styles';
var ServiceCard = function (_a) {
    var service = _a.service;
    var t = useTranslation(['marketplace', 'service']).t;
    return (React.createElement(Card, null,
        React.createElement(ChartBox, null,
            React.createElement(ZigChartMini, { data: service.sparklines, midLine: false, height: 104, width: 360, gradientVariant: 'card', chartProps: {
                    padding: 0,
                } }),
            React.createElement(BottomPnLContainer, { display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 1, flex: 1, negative: +service.pnlPercent30t < 0 },
                React.createElement(ZigTypography, { fontSize: '11px', color: 'neutral200' }, t('service:periods.30d')),
                React.createElement(PercentageIndicator, { style: {
                        fontSize: '13px',
                    }, value: service.pnlPercent30t }))),
        React.createElement(ServiceName, { service: marketplaceServiceToInvestmentType(service), showCoin: false }),
        React.createElement(Box, { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 1, mt: 2.5, mb: 3, px: 2 },
            React.createElement(Box, { display: 'flex', flexDirection: 'column' },
                React.createElement(ValueContainer, null,
                    React.createElement(PercentageIndicator, { style: {
                            fontSize: '17px',
                        }, value: service.pnlPercent90t })),
                React.createElement(ZigTypography, { fontSize: 11, fontWeight: 500, color: 'neutral300', lineHeight: '11px' }, t('service:periods.90d'))),
            React.createElement(Box, { display: 'flex', flexDirection: 'column' },
                React.createElement(AssetContainer, null,
                    React.createElement(AssetsInPool, { shorten: true, assetsValue: service.investedUSDT, serviceId: service.id })),
                React.createElement(ZigTypography, { fontSize: 11, fontWeight: 500, color: 'neutral300', lineHeight: '11px' }, t('card.assets'))),
            React.createElement(Box, { display: 'flex', flexDirection: 'column' },
                React.createElement(ValueContainer, null,
                    React.createElement(ZigTypography, { color: 'neutral200', fontSize: 17, fontWeight: 500 }, service.investors)),
                React.createElement(ZigTypography, { fontSize: 11, fontWeight: 500, color: 'neutral300', lineHeight: '11px' }, t('card.investors')))),
        React.createElement(ButtonContainer, null,
            React.createElement(MarketplaceAction, { service: service, prefixId: 'marketplace-card' }))));
};
export default ServiceCard;
//# sourceMappingURL=index.js.map