import React from 'react';
import { Box } from '@mui/material';
import { ZigTypography } from '@zignaly-open/ui';
import { StepBox, StepCounter } from '../styles';
import { Trans, useTranslation } from 'react-i18next';
import copy from 'copy-to-clipboard';
import { useToast } from '../../../util/hooks/useToast';
import { useReferralRewardsQuery } from '../../../apis/referrals/api';
var ReferralSuccessStep = function (_a) {
    var step = _a.step, link = _a.link;
    var t = useTranslation('referrals').t;
    var data = useReferralRewardsQuery().data;
    var toast = useToast();
    return (React.createElement(StepBox, { sx: { display: 'flex', flexDirection: 'row' } },
        React.createElement(StepCounter, null,
            React.createElement(ZigTypography, { variant: 'h2', color: 'highlighted' }, step)),
        React.createElement(Box, null,
            React.createElement(ZigTypography, { variant: 'h2' }, t("how-to-earn-steps.step-".concat(step, ".title"))),
            React.createElement(ZigTypography, { component: 'p', sx: { mt: 1, mb: 2, minHeight: '100px' } },
                React.createElement(Trans, { t: t, i18nKey: "how-to-earn-steps.step-".concat(step, ".description"), values: {
                        reward: 20,
                        successFee: data.configuration.zignalySuccessFee,
                    } },
                    React.createElement(ZigTypography, { component: 'span', onClick: function () {
                            copy(link);
                            toast.success(t('action:copied'));
                        }, color: 'links', sx: {
                            cursor: 'pointer',
                            '&:hover': {
                                textDecoration: 'underline',
                            },
                        } }))),
            React.createElement("img", { src: "/images/referrals/referrals_step".concat(step, ".png"), alt: t("how-to-earn-steps.step-".concat(step, ".title")) }))));
};
export default ReferralSuccessStep;
//# sourceMappingURL=ReferralSuccessStep.js.map