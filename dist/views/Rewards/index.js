import React, { useMemo } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useTitle } from 'react-use';
import { createColumnHelper, PageContainer, ZigPriceLabel, ZigTable, ZigTypography, } from '@zignaly-open/ui';
import { BenefitClaimedStatus, BenefitType, } from '../../apis/referrals/types';
import { Box, Paper } from '@mui/material';
import LayoutContentWrapper from '../../components/LayoutContentWrapper';
import { useBenefitsClaimedQuery, useBenefitsQuery, } from '../../apis/referrals/api';
import BenefitBox from './components/BenefitBox';
import { formatLocalizedDate } from '../Dashboard/components/MyDashboard/util';
import DepositModal from '../Dashboard/components/ManageInvestmentModals/DepositModal';
import { useZModal } from '../../components/ZModal/use';
import TermsButtonModal from './components/TermsButtonModal';
var Rewards = function () {
    var t = useTranslation(['rewards']).t;
    useTitle(t('pages:rewards'));
    var benefitsEndpoint = useBenefitsQuery();
    var rewardsClaimed = useBenefitsClaimedQuery();
    var showModal = useZModal().showModal;
    var deposit = function () {
        return showModal(DepositModal, {
            ctaId: 'rewards-deposit-button',
        });
    };
    var columnHelper = createColumnHelper();
    var columns = useMemo(function () { return [
        columnHelper.accessor('date', {
            header: t('table.time-and-date'),
            cell: function (_a) {
                var getValue = _a.getValue;
                return (React.createElement(ZigTypography, null, formatLocalizedDate(getValue(), 'P p')));
            },
        }),
        columnHelper.accessor('amount', {
            header: t('common:amount'),
            cell: function (_a) {
                var _b;
                var original = _a.row.original;
                return (React.createElement(Box, { sx: { minWidth: '60px', flexDirection: 'column', display: 'flex' } },
                    React.createElement(ZigPriceLabel, { showTooltip: true, value: original.amount, usd: (_b = original.currency) === null || _b === void 0 ? void 0 : _b.includes('USD'), coin: original.currency })));
            },
        }),
        columnHelper.accessor('title', {
            header: t('table.reward-description'),
            cell: function (_a) {
                var original = _a.row.original;
                return (React.createElement(ZigTypography, null,
                    original.status === BenefitClaimedStatus.SuccessFee ? (React.createElement(Trans, { i18nKey: 'rewards:table.description-success_fee', t: t },
                        React.createElement(ZigPriceLabel, { showTooltip: true, value: original.spent, coin: original.currency, usd: true }),
                        React.createElement(ZigPriceLabel, { showTooltip: true, value: original.remaining, coin: original.currency, usd: true }))) : (React.createElement(Trans, { i18nKey: 'rewards:table.description-awarded', t: t },
                        React.createElement(ZigPriceLabel, { showTooltip: true, value: original.amount, coin: original.currency, usd: true }))),
                    ' ',
                    React.createElement(TermsButtonModal, null)));
            },
        }),
        columnHelper.accessor('status', {
            header: t('table.status'),
            cell: function (_a) {
                var getValue = _a.getValue;
                return (React.createElement(ZigTypography, { color: (getValue() === BenefitClaimedStatus.SuccessFee &&
                        'neutral175') ||
                        (getValue() === BenefitClaimedStatus.Awarded && 'greenGraph') }, Object.values(BenefitClaimedStatus).includes(getValue())
                    ? t("statusTypes.".concat(getValue()))
                    : getValue()));
            },
        }),
    ]; }, []);
    return (React.createElement(PageContainer, { style: { maxWidth: '915px' } },
        React.createElement(LayoutContentWrapper, { endpoint: [benefitsEndpoint, rewardsClaimed], content: function (_a) {
                var benefits = _a[0], benefitsClaimed = _a[1];
                return (React.createElement(React.Fragment, null,
                    React.createElement(Box, { sx: {
                            mt: 5,
                            justifyContent: 'center',
                            mb: 6,
                            display: 'flex',
                            flexDirection: 'row',
                        } },
                        React.createElement(Box, { sx: {
                                mr: 4,
                                ml: 4,
                                display: 'flex',
                                alignItems: 'center',
                            } },
                            React.createElement("img", { src: '/images/referrals/gift-large.png', style: { width: 100 }, alt: 'referral' })),
                        React.createElement(Box, { sx: {
                                maxWidth: 700,
                                justifyContent: 'center',
                                display: 'flex',
                                flexDirection: 'column',
                            } },
                            React.createElement(ZigTypography, { sx: {
                                    mb: 1,
                                }, variant: 'bigNumber' }, t('title')),
                            React.createElement(ZigTypography, null, t('description')))),
                    React.createElement(ZigTypography, { variant: 'h2', sx: { mt: 3, mb: 3 } }, t('active-rewards')),
                    benefits.map(function (b, i) { return (React.createElement(BenefitBox, { label: t("rewardTypes.".concat(b.status)), description: t("rewardDescriptions.".concat(b.status), {
                            amount: b.amount,
                        }), currentAmount: b.amount - b.currentAmount, requiredAmount: b.amount, rewardAmount: b.amount, actionLabel: t(b.status === BenefitType.Deposit
                            ? 'action:deposit'
                            : 'active'), tooltip: b.status === BenefitType.Deposit
                            ? undefined
                            : t('disabled-voucher'), buttonId: b.status === BenefitType.Deposit
                            ? 'rewards__deposit-button'
                            : 'rewards__already-active-button', showProgress: b.status === BenefitType.FeeVoucher, onAction: b.status === BenefitType.Deposit ? deposit : undefined, key: "reward-".concat(i) })); }),
                    !(benefits === null || benefits === void 0 ? void 0 : benefits.length) && (React.createElement(Paper, { sx: { p: 2 } },
                        React.createElement(ZigTypography, null, t('no-active-rewards')))),
                    React.createElement(ZigTypography, { variant: 'h2', sx: { mt: 5, mb: 3 } }, t('table.title')),
                    (benefitsClaimed === null || benefitsClaimed === void 0 ? void 0 : benefitsClaimed.length) > 0 ? (React.createElement(ZigTable, { columns: columns, data: benefitsClaimed, columnVisibility: false, enableSortingRemoval: false, emptyMessage: t('table.no-benefits') })) : (React.createElement(Paper, { sx: { p: 2 } },
                        React.createElement(ZigTypography, null, t('table.no-benefits'))))));
            } })));
};
export default Rewards;
//# sourceMappingURL=index.js.map