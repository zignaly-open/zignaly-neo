import React from 'react';
import { Box, Link } from '@mui/material';
import { ZigTypography } from '@zignaly-open/ui';
import { StepBox, StepCounter } from './styles';
import { Trans, useTranslation } from 'react-i18next';
import AccessTimeFilledRoundedIcon from '@mui/icons-material/AccessTimeFilledRounded';
import { useZModal } from '../../../../components/ZModal/use';
import DepositModal from '../ManageInvestmentModals/DepositModal';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PROFIT_SHARING } from '../../../../routes';
import { BUY_CRYPTO_URL } from '../../../../util/constants';
import NorthEastIcon from '@mui/icons-material/NorthEast';
var InvestingStep = function (_a) {
    var step = _a.step;
    var t = useTranslation('my-dashboard').t;
    var showModal = useZModal().showModal;
    var navigate = useNavigate();
    return (React.createElement(StepBox, { sx: {
            display: 'flex',
            flexDirection: 'row',
        } },
        React.createElement(StepCounter, null,
            React.createElement(ZigTypography, { variant: 'h2', color: 'highlighted' }, step)),
        React.createElement(Box, null,
            React.createElement(ZigTypography, { variant: 'h2' }, t("how-to-invest-steps.step-".concat(step, ".title"))),
            React.createElement(ZigTypography, { component: 'p', sx: { mt: 1, mb: 2, minHeight: '75px' } },
                React.createElement(Trans, { t: t, i18nKey: "how-to-invest-steps.step-".concat(step, ".description"), values: {
                        minDeposit: 100,
                        reward: 20,
                        successFee: 5,
                    } },
                    React.createElement(ZigTypography, { id: step === 1
                            ? 'my-portfolio-steps__step-marketplace'
                            : 'my-portfolio-steps__step-deposit', component: 'span', color: 'links', sx: {
                            cursor: 'pointer',
                            '&:hover': {
                                textDecoration: 'underline',
                            },
                        }, onClick: function () {
                            step === 1 && navigate(ROUTE_PROFIT_SHARING);
                            step === 2 && showModal(DepositModal);
                        } }),
                    step === 2 && (React.createElement(Link, { id: 'my-portfolio-steps__step-purchase', href: BUY_CRYPTO_URL, underline: 'hover', target: '_blank' })),
                    step === 2 && (React.createElement(NorthEastIcon, { sx: {
                            width: '13px',
                            height: '13px',
                            mb: '-2px',
                            color: 'links',
                        } })))),
            React.createElement(Box, { display: 'flex', gap: '5px', minHeight: '50px' },
                React.createElement(ZigTypography, { variant: 'body2' }, t("how-to-invest-steps.step-".concat(step, ".time"))),
                React.createElement(AccessTimeFilledRoundedIcon, { fontSize: 'inherit', color: 'secondary' })),
            React.createElement(Box, { sx: { marginTop: step === 1 && '25px' } },
                React.createElement(Box, { component: 'img', sx: {
                        maxHeight: step === 1 ? 120 : 145,
                        opacity: step === 2 && 0.75,
                    }, src: "/images/portfolio/step".concat(step, ".svg"), alt: t("how-to-invest-steps.step-".concat(step, ".title")) })))));
};
export default InvestingStep;
//# sourceMappingURL=InvestingStep.js.map