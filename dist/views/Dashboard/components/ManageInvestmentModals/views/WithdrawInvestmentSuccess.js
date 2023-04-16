import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Typography } from '@zignaly-open/ui';
import { ModalActions } from 'components/ZModal/ModalContainer/styles';
function WithdrawInvestmentSuccess(_a) {
    var close = _a.close;
    var t = useTranslation('withdraw-your-investment').t;
    return (React.createElement(React.Fragment, null,
        React.createElement(Typography, { variant: 'body1', color: 'neutral200' }, t('success.description')),
        React.createElement(ModalActions, null,
            React.createElement(Button, { id: 'withdraw__close', onClick: close, size: 'large', caption: t('success.button') }))));
}
export default WithdrawInvestmentSuccess;
//# sourceMappingURL=WithdrawInvestmentSuccess.js.map