import React from 'react';
import { useIsInvestedInService } from '../../../../../apis/investment/use';
import { useActiveExchange } from '../../../../../apis/user/use';
import { useMediaQuery } from '@mui/material';
import theme from '../../../../../theme';
import { useTranslation } from 'react-i18next';
import { useUpdateEffect } from 'react-use';
import { Box } from '@mui/system';
import { Avatar } from '@zignaly-open/ui';
import { getServiceLogo } from '../../../../../util/images';
import ServiceInformation from './ServiceInformation';
var ServiceProfileHeader = function (_a) {
    var service = _a.service;
    var isInvested = useIsInvestedInService(service.id);
    var md = useMediaQuery(theme.breakpoints.up('sm'));
    var t = useTranslation('service').t;
    var activeExchange = useActiveExchange();
    useUpdateEffect(function () {
        (activeExchange === null || activeExchange === void 0 ? void 0 : activeExchange.internalId) && isInvested.refetch();
    }, [activeExchange === null || activeExchange === void 0 ? void 0 : activeExchange.internalId]);
    return (React.createElement(Box, { sx: {
            flexDirection: md ? 'row' : 'column',
            display: 'flex',
            flex: 1,
            alignItems: 'center',
        } },
        React.createElement(Box, { sx: { width: '55px', marginBottom: md ? 0 : 2 } },
            React.createElement(Avatar, { size: 'x-large', alt: t('logo-alt', { name: service.name }), image: getServiceLogo(service.logo), id: 'service-profile__avatar' })),
        React.createElement(Box, { ml: md ? 2 : 0, flex: 1, sx: { textAlign: md ? 'left' : 'center' } },
            React.createElement(ServiceInformation, { service: service }))));
};
export default ServiceProfileHeader;
//# sourceMappingURL=ServiceProfileHeader.js.map