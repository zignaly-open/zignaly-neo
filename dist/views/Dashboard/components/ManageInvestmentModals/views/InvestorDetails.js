import React from 'react';
import { useServiceDetails } from '../../../../../apis/service/use';
import { useSelectedInvestment } from '../../../../../apis/investment/use';
import InvestorDetailsForService from './InvestorDetailsForService';
var InvestorDetails = function () {
    var service = useSelectedInvestment();
    var data = useServiceDetails(service.serviceId).data;
    return (React.createElement(InvestorDetailsForService, { service: {
            serviceLogo: service.serviceLogo,
            serviceName: service.serviceName,
            successFee: data.successFee,
        } }));
};
export default InvestorDetails;
//# sourceMappingURL=InvestorDetails.js.map