import React, { useCallback, useMemo } from 'react';
import { Box, Grid } from '@mui/material';
import { ZigButton, ZigTypography } from '@zignaly-open/ui';
import { GetWhatYouDeserveLabel, OlList, RewardsListContainer, TotalBoxValue, UlList, } from '../styles';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Trans, useTranslation } from 'react-i18next';
import { useZAlert } from '../../../components/ZModal/use';
import { hardcodedInviteeReward } from '../constants';
var ReferralRewardsList = function (_a) {
    var rewards = _a.rewards;
    var t = useTranslation(['referrals', 'pages']).t;
    var config = rewards.configuration;
    var showModal = useZAlert();
    var elementsYou = useMemo(function () {
        return [
            config.enableSuccessFeeReward &&
                !!config.zignalySuccessFee &&
                config.zignalySuccessFee === config.zignalyRebateFee && (React.createElement(Trans, { i18nKey: 'referrals:invite-friends-for-revenue', t: t, values: {
                    value: config.zignalySuccessFee,
                } },
                React.createElement(ZigTypography, null),
                React.createElement(TotalBoxValue, null),
                React.createElement(ZigTypography, { color: 'neutral400', sx: { fontSize: '13px' } }))),
            config.enableSuccessFeeReward &&
                !!config.zignalySuccessFee &&
                config.zignalySuccessFee !== config.zignalyRebateFee && (React.createElement(Trans, { i18nKey: 'referrals:invite-friends-for-percent', t: t, values: {
                    value: config.zignalySuccessFee,
                } },
                React.createElement(ZigTypography, null),
                React.createElement(TotalBoxValue, null),
                React.createElement(ZigTypography, { color: 'neutral400', sx: { fontSize: '13px' } }))),
            config.enableSuccessFeeReward &&
                !!config.traderSuccessFee &&
                config.traderSuccessFee === config.traderRebateFee && (React.createElement(Trans, { i18nKey: 'referrals:invite-traders-for-revenue', t: t, values: {
                    value: config.traderSuccessFee,
                } },
                React.createElement(ZigTypography, null),
                React.createElement(TotalBoxValue, null),
                React.createElement(ZigTypography, { color: 'neutral400', sx: { fontSize: '13px' } }))),
            config.enableSuccessFeeReward && !!config.traderSuccessFee && (React.createElement(Trans, { i18nKey: 'referrals:invite-traders-for-percent', t: t, values: {
                    value: config.traderSuccessFee,
                } },
                React.createElement(ZigTypography, null),
                React.createElement(TotalBoxValue, null),
                React.createElement(ZigTypography, { color: 'neutral400', sx: { fontSize: '13px' } }))),
            !config.enableRebateFeeReward &&
                !!config.zignalyRebateFee &&
                config.zignalySuccessFee !== config.zignalyRebateFee && (React.createElement(Trans, { i18nKey: 'referrals:invite-friends-for-percent-rebate', t: t, values: {
                    value: config.zignalyRebateFee,
                } },
                React.createElement(ZigTypography, null),
                React.createElement(TotalBoxValue, null),
                React.createElement(ZigTypography, { color: 'neutral400', sx: { fontSize: '13px' } }))),
            !config.enableRebateFeeReward &&
                !!config.traderRebateFee &&
                config.traderSuccessFee === config.traderRebateFee && (React.createElement(Trans, { i18nKey: 'referrals:invite-traders-for-percent-rebate', t: t, values: {
                    value: config.traderRebateFee,
                } },
                React.createElement(ZigTypography, null),
                React.createElement(TotalBoxValue, null),
                React.createElement(ZigTypography, { color: 'neutral400', sx: { fontSize: '13px' } }))),
            !!config.rewardOneAllocationAmount && (React.createElement(Trans, { i18nKey: 'referrals:invite-for-investment', t: t, values: {
                    value: config.rewardOneAllocationAmount,
                    symbol: config.rewardOneAllocationSymbol,
                    threshold: config.rewardMinOneAllocationAmount,
                } },
                React.createElement(ZigTypography, null),
                React.createElement(TotalBoxValue, null),
                React.createElement(ZigTypography, { color: 'neutral400', sx: { fontSize: '13px' } }))),
            !!config.rewardTotalAllocationAmount && (React.createElement(Trans, { i18nKey: "referrals:invite-for-total-investment".concat(config.rewardMinTotalAllocationDays ? '-days' : ''), t: t, values: {
                    value: config.rewardTotalAllocationAmount,
                    symbol: config.rewardTotalAllocationSymbol,
                    threshold: config.rewardMinTotalAllocationAmount,
                    count: config.rewardMinTotalAllocationDays,
                } },
                React.createElement(ZigTypography, null),
                React.createElement(TotalBoxValue, null),
                React.createElement(ZigTypography, { color: 'neutral504', sx: { fontSize: '13px' } }))),
            !!config.rewardDepositAmount && (React.createElement(Trans, { i18nKey: 'referrals:invite-for-deposit', t: t, values: {
                    value: config.rewardDepositAmount,
                    symbol: config.rewardDepositSymbol,
                    threshold: config.rewardMinDepositAmount,
                } },
                React.createElement(ZigTypography, null),
                React.createElement(TotalBoxValue, null),
                React.createElement(ZigTypography, { color: 'neutral400', sx: { fontSize: '13px' } }))),
            !!config.rewardBalanceAmount && (React.createElement(Trans, { i18nKey: 'referrals:invite-for-balance', t: t, values: {
                    value: config.rewardBalanceAmount,
                    symbol: config.rewardBalanceSymbol,
                    threshold: config.rewardMinBalanceAmount,
                } },
                React.createElement(ZigTypography, null),
                React.createElement(TotalBoxValue, null),
                React.createElement(ZigTypography, { color: 'neutral400', sx: { fontSize: '13px' } }))),
            !!config.rewardSignupAmount && (React.createElement(Trans, { i18nKey: 'referrals:invite-for-signup', t: t, values: {
                    value: config.rewardSignupAmount,
                    symbol: config.rewardSignupSymbol,
                } },
                React.createElement(ZigTypography, null),
                React.createElement(TotalBoxValue, null),
                React.createElement(ZigTypography, { color: 'neutral400', sx: { fontSize: '13px' } }))),
        ].filter(Boolean);
    }, [config, t]);
    var elementsThem = useMemo(function () { return [
        config.enableSuccessFeeReward && !!config.zignalySuccessFee && (React.createElement(Trans, { i18nKey: 'referrals:they-get-invest', t: t, values: hardcodedInviteeReward },
            React.createElement(ZigTypography, { sx: { opacity: 0 } }),
            React.createElement(TotalBoxValue, null),
            React.createElement(ZigTypography, { color: 'neutral400', sx: { fontSize: '13px' } }))),
    ]; }, [config, t]);
    var modalFriendElements = useMemo(function () {
        return [
            config.enableSuccessFeeReward &&
                !!config.zignalySuccessFee &&
                config.zignalySuccessFee === config.zignalyRebateFee && (React.createElement(Trans, { i18nKey: 'referrals:invite-friends-for-revenue-modal', t: t, values: {
                    value: config.zignalySuccessFee,
                } },
                React.createElement(ZigTypography, { fontWeight: 600, color: 'neutral100' }))),
            config.enableSuccessFeeReward &&
                !!config.zignalySuccessFee &&
                config.zignalySuccessFee !== config.zignalyRebateFee && (React.createElement(Trans, { i18nKey: 'referrals:invite-friends-for-percent-modal', t: t, values: {
                    value: config.zignalySuccessFee,
                } },
                React.createElement(ZigTypography, { fontWeight: 600, color: 'neutral100' }))),
            config.enableRebateFeeReward &&
                !!config.zignalyRebateFee &&
                config.zignalySuccessFee !== config.zignalyRebateFee && (React.createElement(Trans, { i18nKey: 'referrals:invite-friends-for-percent-rebate-modal', t: t, values: {
                    value: config.zignalyRebateFee,
                } },
                React.createElement(ZigTypography, { fontWeight: 600, color: 'neutral100' }))),
            !!config.rewardOneAllocationAmount && (React.createElement(Trans, { i18nKey: 'referrals:invite-for-investment-modal', t: t, values: {
                    value: config.rewardOneAllocationAmount,
                    symbol: config.rewardOneAllocationSymbol,
                    threshold: config.rewardMinOneAllocationAmount,
                } },
                React.createElement(ZigTypography, { fontWeight: 600, color: 'neutral100' }))),
            !!config.rewardTotalAllocationAmount && (React.createElement(Trans, { i18nKey: "referrals:invite-for-total-investment-modal".concat(config.rewardMinTotalAllocationDays ? '-days' : ''), t: t, values: {
                    value: config.rewardTotalAllocationAmount,
                    symbol: config.rewardTotalAllocationSymbol,
                    threshold: config.rewardMinTotalAllocationAmount,
                    count: config.rewardMinTotalAllocationDays,
                } },
                React.createElement(ZigTypography, { fontWeight: 600, color: 'neutral100' }))),
            !!config.rewardDepositAmount && (React.createElement(Trans, { i18nKey: 'referrals:invite-for-deposit-modal', t: t, values: {
                    value: config.rewardDepositAmount,
                    symbol: config.rewardDepositSymbol,
                    threshold: config.rewardMinDepositAmount,
                } },
                React.createElement(ZigTypography, { fontWeight: 600, color: 'neutral100' }))),
            !!config.rewardBalanceAmount && (React.createElement(Trans, { i18nKey: 'referrals:invite-for-balance-modal', t: t, values: {
                    value: config.rewardBalanceAmount,
                    symbol: config.rewardBalanceSymbol,
                    threshold: config.rewardMinBalanceAmount,
                } },
                React.createElement(ZigTypography, { fontWeight: 600, color: 'neutral100' }))),
            !!config.rewardSignupAmount && (React.createElement(Trans, { i18nKey: 'referrals:invite-for-signup-modal', t: t, values: {
                    value: config.rewardSignupAmount,
                    symbol: config.rewardSignupSymbol,
                } },
                React.createElement(ZigTypography, { fontWeight: 600, color: 'neutral100' }))),
        ].filter(Boolean);
    }, [config, t]);
    var modalTraderElements = useMemo(function () {
        return [
            config.enableSuccessFeeReward &&
                !!config.traderSuccessFee &&
                config.traderRebateFee === config.traderSuccessFee && (React.createElement(Trans, { i18nKey: 'referrals:invite-traders-for-revenue-modal', t: t, values: {
                    value: config.traderSuccessFee,
                } },
                React.createElement(ZigTypography, { fontWeight: 600, color: 'neutral100' }))),
            config.enableSuccessFeeReward &&
                !!config.traderSuccessFee &&
                config.traderRebateFee !== config.traderSuccessFee && (React.createElement(Trans, { i18nKey: 'referrals:invite-traders-for-percent-modal', t: t, values: {
                    value: config.traderSuccessFee,
                } },
                React.createElement(ZigTypography, { fontWeight: 600, color: 'neutral100' }))),
            config.enableRebateFeeReward &&
                !!config.traderRebateFee &&
                config.traderRebateFee !== config.traderSuccessFee && (React.createElement(Trans, { i18nKey: 'referrals:invite-traders-for-percent-rebate-modal', t: t, values: {
                    value: config.traderRebateFee,
                } },
                React.createElement(ZigTypography, { fontWeight: 600, color: 'neutral100' }))),
        ].filter(Boolean);
    }, [config, t]);
    var modalThemElements = useMemo(function () { return [
        React.createElement(Trans, { key: 'they-get-invest-modal', i18nKey: 'they-get-invest-modal', t: t, values: hardcodedInviteeReward },
            React.createElement(ZigTypography, { fontWeight: 600, color: 'neutral100' })),
    ]; }, [config, t]);
    var showFullRewards = useCallback(function () {
        showModal({
            title: t('full-rewards-title'),
            okLabel: t('common:ok'),
            description: (React.createElement(Box, { sx: { maxWidth: 650 } },
                !!modalFriendElements.length && (React.createElement(Box, { sx: { mb: 4 } },
                    React.createElement(ZigTypography, { variant: 'h3' }, t('when-invite-friends')),
                    React.createElement(UlList, null, modalFriendElements.map(function (x) { return (React.createElement("li", { key: Math.random() }, x)); })))),
                !!modalTraderElements.length && (React.createElement(Box, { sx: { mb: 4 } },
                    React.createElement(ZigTypography, { variant: 'h3' }, t('when-invite-traders')),
                    React.createElement(UlList, null, modalTraderElements.map(function (x) { return (React.createElement("li", { key: Math.random() }, x)); })))),
                !!modalThemElements.length && (React.createElement(Box, { sx: { mb: 4 } },
                    React.createElement(ZigTypography, { variant: 'h3' }, t('invitee-gets')),
                    React.createElement(UlList, null, modalThemElements.map(function (x) { return (React.createElement("li", { key: Math.random() }, x)); })))),
                React.createElement(Box, { sx: { mb: 4 } },
                    React.createElement(ZigTypography, { variant: 'h3' }, t('terms.title')),
                    React.createElement(OlList, null,
                        React.createElement("li", null, t('terms.1')),
                        React.createElement("li", null, t('terms.2')),
                        React.createElement("li", null, t('terms.3')),
                        React.createElement("li", null, t('terms.4')),
                        React.createElement("li", null, t('terms.5')),
                        React.createElement("li", null, t('terms.6')))))),
        });
    }, [elementsYou]);
    var cols = elementsYou.slice(0, 2).length + elementsThem.slice(0, 1).length + 1;
    return (React.createElement(RewardsListContainer, { container: true, sx: {
            mt: 4,
            mb: 4,
            justifyContent: 'left',
        } },
        React.createElement(Grid, { item: true, xs: 12, md: Math.min(4, 12 / cols) * elementsYou.slice(0, 2).length },
            React.createElement(ZigTypography, { variant: 'h1', textAlign: 'center', fontWeight: 600, sx: { mt: 2, mb: 2.5 } }, t('what-you-get'))),
        React.createElement(Grid, { item: true, xs: 12, md: Math.min(4, 12 / cols) * elementsThem.slice(0, 1).length },
            React.createElement(ZigTypography, { variant: 'h1', textAlign: 'center', fontWeight: 600, sx: { mt: 2, mb: 2.5 } }, t('what-they-get'))),
        React.createElement(Grid, { item: true, xs: 12 }),
        elementsYou.slice(0, 2).map(function (x) { return (React.createElement(Grid, { key: Math.random(), item: true, xs: 12, pl: 3, pr: 3, md: Math.min(4, 12 / cols) },
            React.createElement(GetWhatYouDeserveLabel, null, x))); }),
        elementsThem.slice(0, 1).map(function (x) { return (React.createElement(Grid, { key: Math.random(), item: true, xs: 12, pl: 3, pr: 3, sx: {
                borderLeft: function (theme) { return "1px solid ".concat(theme.palette.neutral700); },
            }, md: Math.min(4, 12 / cols) },
            React.createElement(GetWhatYouDeserveLabel, null, x))); }),
        React.createElement(Grid, { item: true, xs: 12, md: Math.min(4, 12 / cols), pl: 3, pr: 3, sx: {
                alignItems: 'flex-start',
                justifyContent: 'center',
                display: 'flex',
            } },
            React.createElement(ZigButton, { variant: 'outlined', size: 'large', sx: { mb: 3, mt: '28px', color: function (theme) { return theme.palette.neutral175; } }, onClick: showFullRewards },
                t('full-rewards'),
                React.createElement(ArrowForwardIosIcon, { sx: { height: '16px' } })))));
};
export default ReferralRewardsList;
//# sourceMappingURL=ReferralRewardsList.js.map