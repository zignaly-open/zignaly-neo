import { ZigButton } from '@zignaly-open/ui';
import React from 'react';
import { WithdrawFundsOptionWrapper, WithdrawFundsSpaceTaker, WithdrawFundsButtonWrapper, } from '../styles';
import InvestorDetails from './InvestorDetails';
import { useTranslation } from 'react-i18next';
import { Box, Grid } from '@mui/material';
import { EditInvestmentViews } from '../types';
var WithdrawInvestment = function (_a) {
    var setView = _a.setView;
    var t = useTranslation('edit-investment').t;
    return (React.createElement(Box, { display: 'flex', flexDirection: 'column', alignItems: 'center' },
        React.createElement(Grid, { container: true, md: 8 },
            React.createElement(InvestorDetails, null),
            React.createElement(Grid, { container: true, marginBottom: 3, rowSpacing: 6, display: 'flex', flexDirection: 'column', alignItems: 'center' },
                React.createElement(Grid, { item: true, sm: 12 },
                    React.createElement(WithdrawFundsOptionWrapper, null,
                        React.createElement(WithdrawFundsSpaceTaker, { component: 'p', variant: 'body1', color: 'neutral200', weight: 'regular' }, t('modal.withdrawInvestment.freeWithdrawal.description')),
                        React.createElement(WithdrawFundsButtonWrapper, null,
                            React.createElement(ZigButton, { id: 'withdraw__confirm-withdraw', onClick: function () { return setView(EditInvestmentViews.WithdrawPerform); }, variant: 'contained', size: 'large' }, t('action:withdraw')))))))));
};
export default WithdrawInvestment;
//# sourceMappingURL=WithdrawInvestment.js.map