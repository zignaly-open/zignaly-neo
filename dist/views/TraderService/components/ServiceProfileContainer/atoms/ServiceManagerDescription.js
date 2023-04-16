import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import MarkdownSection from './MarkdownSection';
import { Box } from '@mui/system';
import { ZigTypography } from '@zignaly-open/ui';
import Countries from 'i18n-iso-countries';
import { CountryFlag, StyledVerifiedIcon } from '../styles';
import { Tooltip } from '@mui/material';
import { formatLocalizedDistance } from '../../../../Dashboard/components/MyDashboard/util';
var ServiceManagerDescription = function (_a) {
    var service = _a.service;
    var _b = useTranslation('service'), t = _b.t, i18n = _b.i18n;
    var country = Countries.getName(service.ownerCountry, i18n.language);
    var _c = useState(true), flagInFolder = _c[0], setFlagInFolder = _c[1];
    return (React.createElement(Box, { id: 'service-profile__about-manager' },
        React.createElement(MarkdownSection, { content: service.ownerDescription, title: t('about-trader'), emptyText: t('about-trader-empty'), subtitle: React.createElement(Box, { sx: {
                    flexDirection: 'row',
                    display: 'flex',
                    flex: 1,
                    alignItems: 'flex-start',
                } },
                React.createElement(ZigTypography, { variant: 'h2', sx: {
                        mb: 1,
                        display: 'flex',
                        alignItems: 'center',
                    } },
                    service.ownerName,
                    service.ownerVerified && (React.createElement(Tooltip, { title: t('owner-verified') },
                        React.createElement(StyledVerifiedIcon, { sx: { ml: 1 }, width: 13, height: 13 }))),
                    service.ownerCountry && flagInFolder && (React.createElement(Tooltip, { title: t('owner-from', {
                            country: country || service.ownerCountry,
                        }) },
                        React.createElement(CountryFlag, { src: "/images/country-flags/".concat(service.ownerCountry.toUpperCase(), ".svg"), onError: function () {
                                setFlagInFolder(false);
                            } }))),
                    React.createElement(ZigTypography, { sx: {
                            ml: 2,
                            position: 'relative',
                            top: '2px',
                        }, variant: 'body2', color: 'neutral400', component: 'span' }, t('about-trader-joined-time', {
                        date: formatLocalizedDistance(new Date(), new Date(service.ownerCreatedAt)),
                    })))) })));
};
export default ServiceManagerDescription;
//# sourceMappingURL=ServiceManagerDescription.js.map