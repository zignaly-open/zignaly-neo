import React from 'react';
import { Icon } from './styles';
import { Avatar, ZigTypography } from '@zignaly-open/ui';
import Box from '@mui/system/Box/Box';
import { ROUTE_TRADING_SERVICE } from '../../../../routes';
import { generatePath, Link } from 'react-router-dom';
import { getServiceLogo } from '../../../../util/images';
import { useTranslation } from 'react-i18next';
import { Tooltip } from '@mui/material';
import { StyledVerifiedIcon } from './styles';
export var ServiceName = function (_a) {
    var _b;
    var prefixId = _a.prefixId, service = _a.service, _c = _a.showCoin, showCoin = _c === void 0 ? true : _c;
    var t = useTranslation('table').t;
    return (React.createElement(Box, { id: prefixId && "".concat(prefixId, "__service-").concat(service.serviceId), component: Link, to: generatePath(ROUTE_TRADING_SERVICE, {
            serviceId: (_b = service.serviceId) === null || _b === void 0 ? void 0 : _b.toString(),
        }), sx: {
            cursor: 'pointer',
            alignItems: 'center',
            flexDirection: 'row',
            display: 'flex',
            textAlign: 'start',
            width: 300,
        } },
        React.createElement(Icon, null,
            React.createElement(Avatar, { size: 'x-large', image: getServiceLogo(service.serviceLogo) })),
        React.createElement(Box, { sx: {
                flexDirection: 'column',
                display: 'flex',
                alignItems: 'flex-start',
            } },
            React.createElement(ZigTypography, { id: prefixId && "".concat(prefixId, "__name-").concat(service.serviceId), fontWeight: 'medium', color: 'neutral100', whiteSpace: 'normal' }, service.serviceName),
            React.createElement("div", null,
                React.createElement(ZigTypography, { variant: 'body2', fontWeight: 'medium', color: 'neutral400', id: prefixId && "".concat(prefixId, "__owner-").concat(service.serviceId) },
                    t('serviceName-by'),
                    " ",
                    service.ownerName),
                service.ownerVerified && (React.createElement(Tooltip, { title: t('owner-verified') },
                    React.createElement(StyledVerifiedIcon, { width: 13, height: 13, id: prefixId && "".concat(prefixId, "__verified-").concat(service.serviceId) })))),
            showCoin && (React.createElement(ZigTypography, { variant: 'body2', fontWeight: 'medium', color: 'neutral400', id: prefixId && "".concat(prefixId, "__ssc-").concat(service.serviceId) }, service.ssc)))));
};
//# sourceMappingURL=index.js.map