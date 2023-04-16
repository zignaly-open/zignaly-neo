import React from 'react';
import { useToast } from '../../../../../util/hooks/useToast';
import { Box, Tooltip, useMediaQuery } from '@mui/material';
import theme from '../../../../../theme';
import { Trans, useTranslation } from 'react-i18next';
import { GreySubHeader, GreySubHeaderHighlight, LinkIconWithSafariFix, Separator, ServiceHeader, StyledCalendarMonthIcon, StyledPersonIcon, StyledVerifiedIcon, } from '../styles';
import { Button } from '@zignaly-open/ui';
import copy from 'copy-to-clipboard';
import { generatePath } from 'react-router-dom';
import { ROUTE_TRADING_SERVICE } from '../../../../../routes';
import { formatLocalizedDistance } from '../../../../Dashboard/components/MyDashboard/util';
var ServiceInformation = function (_a) {
    var service = _a.service;
    var toast = useToast();
    var md = useMediaQuery(theme.breakpoints.up('sm'));
    var t = useTranslation('service').t;
    return (React.createElement(React.Fragment, null,
        React.createElement(ServiceHeader, { component: 'h1', id: 'service-profile__service-name' }, service.name),
        React.createElement(Box, { sx: {
                flexDirection: md ? 'row' : 'column',
                display: 'flex',
                alignItems: 'center',
                paddingRight: md ? 3 : 0,
            } },
            React.createElement(GreySubHeader, { component: md ? 'span' : 'p', id: 'service-profile__owner-name' },
                React.createElement(StyledPersonIcon, null),
                React.createElement(Trans, { t: t, i18nKey: 'service-by', components: [React.createElement(GreySubHeaderHighlight, { key: '--service--by' })], values: { name: service.ownerName } }),
                service.ownerVerified && (React.createElement(Tooltip, { title: t('owner-verified') },
                    React.createElement(StyledVerifiedIcon, { width: 13, height: 13, id: 'service-profile__owner-verified-icon' })))),
            md && React.createElement(Separator, null),
            React.createElement(GreySubHeader, { component: md ? 'span' : 'p', id: 'service-profile__started-since' },
                React.createElement(StyledCalendarMonthIcon, null),
                React.createElement(Trans, { t: t, i18nKey: 'service-age', values: {
                        date: formatLocalizedDistance(new Date(), new Date(service.createdAt)),
                    }, components: [React.createElement(GreySubHeaderHighlight, { key: '--service--by' })] })),
            md ? React.createElement(Separator, null) : React.createElement(Box, { mt: 2 }),
            React.createElement(Button, { id: 'service-profile__copy-link', minWidth: 30, onClick: function () {
                    copy(window.location.origin +
                        generatePath(ROUTE_TRADING_SERVICE, {
                            serviceId: service.id,
                        }));
                    toast.success(t('link-copied'));
                }, leftElement: md ? null : (React.createElement(LinkIconWithSafariFix, { style: { width: '13px', height: '13px' }, color: 'neutral300', width: 13, height: 13 })), size: 'xsmall', variant: 'secondary', caption: md ? (React.createElement(LinkIconWithSafariFix, { color: 'neutral300', width: 13, height: 13 })) : (t('copy-link')) }))));
};
export default ServiceInformation;
//# sourceMappingURL=ServiceInformation.js.map