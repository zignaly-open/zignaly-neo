import React from 'react';
import { useTranslation } from 'react-i18next';
import { useZModal } from '../../../../../components/ZModal/use';
import { useInvestedAccountsCount } from '../../../../../apis/investment/use';
import InvestedFromOtherAccounts from '../../InvestedFromOtherAccounts';
import { TextButton } from '@zignaly-open/ui';
import { StyledChevronRightIcon } from '../styles';
import { Box } from '@mui/material';
var OtherAccountsButton = function (_a) {
    var service = _a.service;
    var t = useTranslation('service').t;
    var investedFromAccounts = useInvestedAccountsCount(service.id);
    var showModal = useZModal().showModal;
    var onClickViewOther = function () {
        showModal(InvestedFromOtherAccounts, {
            service: service,
        });
    };
    return (React.createElement(TextButton, { id: 'service__see-all', caption: t('invest-button.all-accounts', {
            count: investedFromAccounts,
        }), onClick: onClickViewOther, rightElement: React.createElement(Box, { ml: -1 },
            React.createElement(StyledChevronRightIcon, null)) }));
};
export default OtherAccountsButton;
//# sourceMappingURL=OtherAccountsButton.js.map