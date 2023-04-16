import { Box, LinearProgress } from '@mui/material';
import React from 'react';
import TicketShape from '../../../components/TicketShape/atoms';
import { ZigButton, ZigPriceLabel, ZigTypography } from '@zignaly-open/ui';
import TermsButtonModal from './TermsButtonModal';
var BenefitBox = function (_a) {
    var label = _a.label, description = _a.description, currentAmount = _a.currentAmount, tooltip = _a.tooltip, requiredAmount = _a.requiredAmount, showProgress = _a.showProgress, buttonId = _a.buttonId, onAction = _a.onAction, actionLabel = _a.actionLabel, coin = _a.coin, rewardAmount = _a.rewardAmount;
    return (React.createElement(TicketShape, { sx: {
            borderRadius: '10px',
            p: '1px',
        }, backgroundRgb: '37, 55, 57', hole: 13 },
        React.createElement(TicketShape, { sx: {
                borderRadius: '10px',
                minHeight: '140px',
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row',
                gap: '60px',
                pr: '60px',
                pl: '60px',
                pt: 1,
                pb: 1,
            }, backgroundRgb: '20, 25, 54', hole: 14 },
            React.createElement(Box, { sx: {
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '13px',
                    maxWidth: '100px',
                    textAlign: 'center',
                    pb: 1,
                } },
                React.createElement(ZigTypography, { sx: { mb: 1 } }, label),
                React.createElement(ZigPriceLabel, { color: 'neutral175', sx: {
                        fontSize: '36px',
                    }, value: rewardAmount, coin: coin, usd: !coin })),
            React.createElement(Box, { sx: {
                    flex: 1,
                } },
                React.createElement(ZigTypography, null, description),
                React.createElement(TermsButtonModal, null),
                !!showProgress && (React.createElement(Box, { sx: {
                        display: 'flex',
                        color: function (theme) { return theme.palette.neutral300; },
                        flexDirection: 'row',
                        alignItems: 'center',
                        mt: 2,
                    } },
                    React.createElement(LinearProgress, { sx: {
                            flex: 1,
                            mr: 2,
                        }, value: (100 * currentAmount) / requiredAmount, variant: 'determinate' }),
                    React.createElement(Box, null,
                        React.createElement(ZigPriceLabel, { sx: {
                                fontSize: '13px',
                            }, color: 'neutral200', value: currentAmount, coin: coin, usd: !coin }),
                        React.createElement(ZigTypography, { sx: { fontSize: '13px' } }, ' / '),
                        React.createElement(ZigPriceLabel, { sx: {
                                fontSize: '13px',
                            }, color: 'neutral200', value: requiredAmount, coin: coin, usd: !coin }))))),
            React.createElement(Box, { sx: { padding: '0 12px', minWidth: 134 } },
                React.createElement(ZigButton, { sx: {
                        padding: '20px 30px',
                        lineHeight: '20px',
                        fontSize: '18px',
                    }, id: buttonId, tooltip: tooltip, size: 'large', onClick: onAction, variant: 'contained', disabled: !onAction }, actionLabel)))));
};
export default BenefitBox;
//# sourceMappingURL=BenefitBox.js.map