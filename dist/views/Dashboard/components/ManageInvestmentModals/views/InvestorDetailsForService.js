import React from 'react';
import { Avatar, Typography } from '@zignaly-open/ui';
import { Investor, InvestorData, InvestorName } from '../styles';
import { getServiceLogo } from 'util/images';
import { useTranslation } from 'react-i18next';
var InvestorDetailsForService = function (_a) {
    var _b;
    var service = _a.service;
    var t = useTranslation('edit-investment').t;
    return (React.createElement(Investor, null,
        !!service.serviceLogo && (React.createElement(Avatar, { size: 'xx-large', image: getServiceLogo(service.serviceLogo) })),
        React.createElement(InvestorData, null,
            React.createElement(InvestorName, { variant: 'h2', color: 'neutral100' }, service.serviceName),
            ((_b = service.successFee) === null || _b === void 0 ? void 0 : _b.toString()) && (React.createElement(Typography, { variant: 'h3', color: 'neutral400' }, t('investorDetail-successFee', {
                fee: service.successFee,
            }))))));
};
export default InvestorDetailsForService;
//# sourceMappingURL=InvestorDetailsForService.js.map