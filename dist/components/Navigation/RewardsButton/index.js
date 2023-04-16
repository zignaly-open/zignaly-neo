import React from 'react';
import { Box } from '@mui/material';
import { ZigTypography } from '@zignaly-open/ui';
import { useTranslation } from 'react-i18next';
import { generatePath, Link } from 'react-router-dom';
import { ROUTE_REWARDS } from '../../../routes';
import TicketShape, { TicketShapeIndependent } from '../../TicketShape/atoms';
import { useBenefitsQuery } from '../../../apis/referrals/api';
import { BenefitType } from '../../../apis/referrals/types';
var RewardsButton = function () {
    var t = useTranslation('rewards').t;
    var benefits = useBenefitsQuery().data;
    if (!(benefits === null || benefits === void 0 ? void 0 : benefits.some(function (x) { return x.status === BenefitType.Deposit; })))
        return null;
    return (React.createElement(Link, { to: generatePath(ROUTE_REWARDS) },
        React.createElement(TicketShape, { sx: { borderRadius: '4px', padding: '1px' }, backgroundRgb: '22, 42, 71', backgroundRgbHover: '37, 35, 57', hole: 8 },
            React.createElement(TicketShapeIndependent, { sx: { borderRadius: '3px', height: '40px', cursor: 'pointer' }, backgroundRgb: '13, 28, 56', backgroundRgbHover: '53, 51, 74', hole: 9 },
                React.createElement(Box, { sx: {
                        gap: '10px',
                        marginLeft: '2px',
                        height: '100%',
                        marginRight: '2px',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                    } },
                    React.createElement("img", { src: '/images/referrals/gift-mini.png', width: '24', height: '25', alt: 'gift' }),
                    React.createElement(Box, { sx: {
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        } },
                        React.createElement(ZigTypography, { color: 'primary', sx: {
                                fontSize: '13px',
                                lineHeight: 1,
                                textAlign: 'center',
                            } }, t('header.title')),
                        React.createElement(ZigTypography, { sx: {
                                mt: '1px',
                                fontSize: '10px',
                                lineHeight: 1.3,
                                textAlign: 'center',
                            } }, t('header.description'))))))));
};
export default RewardsButton;
//# sourceMappingURL=index.js.map