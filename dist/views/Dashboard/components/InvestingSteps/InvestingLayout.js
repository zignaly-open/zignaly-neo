import React from 'react';
import InvestingStep from './InvestingStep';
import { ZigButton, ZigTypography } from '@zignaly-open/ui';
import { Box, Grid, Paper } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ROUTE_PROFIT_SHARING } from '../../../../routes';
var InvestingLayout = function () {
    var t = useTranslation('my-dashboard').t;
    return (React.createElement(Box, { sx: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '0 100px',
        } },
        React.createElement(ZigTypography, { variant: 'h1', sx: { ml: 5 } }, t('how-to-invest-steps.title')),
        React.createElement(Grid, { container: true, sx: { mt: 3, mb: 3, mr: 5, gap: 7, justifyContent: 'center' } },
            React.createElement(Grid, { item: true, xs: 12, md: 3.5 },
                React.createElement(InvestingStep, { step: 1 })),
            React.createElement(Grid, { item: true, xs: 12, md: 3.5 },
                React.createElement(InvestingStep, { step: 2 })),
            React.createElement(Grid, { item: true, xs: 12, md: 3.5 },
                React.createElement(InvestingStep, { step: 3 }))),
        React.createElement(Box, { sx: { padding: '0 12px', minWidth: 134 } },
            React.createElement(Link, { to: ROUTE_PROFIT_SHARING },
                React.createElement(ZigButton, { id: 'my-portfolio-steps__marketplace', variant: 'contained', sx: {
                        padding: '18px 25px',
                        lineHeight: '20px',
                        ml: 5,
                    } },
                    React.createElement(ZigTypography, { variant: 'body1', color: 'neutral000', fontWeight: 600, letterSpacing: 1.1 }, t('how-to-invest-steps.start-investing'))))),
        React.createElement(Box, { sx: { display: 'flex', mt: 5, flexDirection: 'column', width: '100%' } },
            React.createElement(ZigTypography, { variant: 'h2', sx: { mb: 2 } }, t('how-to-invest-steps.bottom-title')),
            React.createElement(Paper, { sx: { p: 2 } },
                React.createElement(ZigTypography, null, t('how-to-invest-steps.bottom-description'))))));
};
export default InvestingLayout;
//# sourceMappingURL=InvestingLayout.js.map