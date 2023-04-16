import React from 'react';
import { useTranslation } from 'react-i18next';
import { TypographyPanelName } from './TransactionDetails/styles';
var ServiceLink = function (_a) {
    var serviceId = _a.serviceId, serviceName = _a.serviceName, servicePsVersion = _a.servicePsVersion;
    var t = useTranslation('transactions-history').t;
    return (React.createElement(TypographyPanelName, null, !serviceName || servicePsVersion === 1 ? (serviceName || t('psService')) : (React.createElement("a", { target: '_blank', rel: 'noopener noreferrer', href: "".concat(window.location.origin, "/profit-sharing/").concat(serviceId) }, serviceName))));
};
export default ServiceLink;
//# sourceMappingURL=ProviderLink.js.map