import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTitle } from 'react-use';
import { useReferralHistoryQuery, useReferralRewardsQuery, } from '../../apis/referrals/api';
import { Box, Grid } from '@mui/material';
import { CloneIcon, dark, InputText, PageContainer, ZigButton, ZigPriceLabel, ZigTypography, } from '@zignaly-open/ui';
import GroupIcon from '@mui/icons-material/Group';
import LayoutContentWrapper from '../../components/LayoutContentWrapper';
import { useCurrentUser } from '../../apis/user/use';
import copy from 'copy-to-clipboard';
import { useToast } from '../../util/hooks/useToast';
import { generatePath } from 'react-router-dom';
import { ROUTE_REFERRALS_INVITE, ROUTE_REFERRALS_INVITE_SHORT, } from '../../routes';
import { TotalBox } from './atoms';
import ReferralTable from './components/ReferralTable';
import ReferralRewardsList from './components/ReferralRewardsList';
import ReferralSuccessStep from './components/ReferralSuccessStep';
import { useZModal } from 'components/ZModal/use';
import ReferralInviteModal from './components/ReferralInviteModal';
var Referrals = function () {
    var _a;
    var t = useTranslation(['referrals', 'pages']).t;
    var rewards = useReferralRewardsQuery();
    var history = useReferralHistoryQuery();
    var refCode = useCurrentUser().refCode;
    var toast = useToast();
    var showModal = useZModal().showModal;
    useTitle(t('pages:referrals'));
    var baseUrl = window.location.protocol +
        '//' +
        (((_a = window.location.host) === null || _a === void 0 ? void 0 : _a.includes('localhost'))
            ? 'app.zignaly.com'
            : window.location.host);
    var link = baseUrl + generatePath(ROUTE_REFERRALS_INVITE, { key: refCode });
    var shortLink = baseUrl + generatePath(ROUTE_REFERRALS_INVITE_SHORT, { key: refCode });
    var openInviteModal = function () {
        return showModal(ReferralInviteModal, { url: link, urlShort: shortLink });
    };
    return (React.createElement(PageContainer, { style: { maxWidth: '1200px' } },
        React.createElement(LayoutContentWrapper, { endpoint: [rewards, history], content: function (_a) {
                var rewardsData = _a[0], referrals = _a[1];
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
                            React.createElement("img", { src: '/images/referrals/envelope-main.png', style: { width: 200, marginTop: 17 }, alt: 'referral' })),
                        React.createElement(Box, { sx: {
                                flex: 1,
                                maxWidth: 700,
                                justifyContent: 'center',
                                display: 'flex',
                                flexDirection: 'column',
                            } },
                            React.createElement(ZigTypography, { sx: {
                                    mb: 1,
                                }, variant: 'bigNumber' }, t('title')),
                            React.createElement(Box, { sx: {
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'flex-end',
                                } },
                                React.createElement(Box, { sx: { flex: 1 } },
                                    React.createElement(InputText, { readOnly: true, value: link, rightSideElement: React.createElement(CloneIcon, { id: 'referrals__copy-link', width: 40, height: 40, color: dark.neutral300 }), onClickRightSideElement: function () {
                                            copy(link);
                                            toast.success(t('action:copied'));
                                        } })),
                                React.createElement(ZigButton, { variant: 'contained', id: 'referrals__open-invite-image-modal', size: 'large', sx: {
                                        mb: '10px',
                                        height: '66px',
                                        ml: 1,
                                        fontSize: '16px',
                                        textTransform: 'uppercase',
                                    }, onClick: openInviteModal },
                                    React.createElement("img", { src: '/images/referrals/qrcode.svg', width: '16', height: '16', style: { marginRight: 10 }, alt: '' }),
                                    t('create-invite.create-invite'))))),
                    React.createElement(ReferralRewardsList, { rewards: rewardsData }),
                    !rewardsData.invitedCount ? (React.createElement(React.Fragment, null,
                        React.createElement(ZigTypography, { align: 'center', variant: 'h1', sx: { mt: 7, mb: 5 } }, t('how-to-earn')),
                        React.createElement(Grid, { container: true, sx: { mb: 8 } },
                            React.createElement(Grid, { item: true, xs: 12, md: 4 },
                                React.createElement(ReferralSuccessStep, { step: 1, link: link })),
                            React.createElement(Grid, { item: true, xs: 12, md: 4 },
                                React.createElement(ReferralSuccessStep, { step: 2 })),
                            React.createElement(Grid, { item: true, xs: 12, md: 4 },
                                React.createElement(ReferralSuccessStep, { step: 3 }))))) : (React.createElement(React.Fragment, null,
                        React.createElement(ZigTypography, { align: 'center', variant: 'h1', sx: { mt: 7 } }, t('my-referrals')),
                        React.createElement(Box, { sx: {
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-evenly',
                                pt: 5,
                                pb: 5,
                            } },
                            React.createElement(TotalBox, { label: t('total-invitees'), value: React.createElement(ZigTypography, { color: 'neutral175' },
                                    rewardsData.invitedCount,
                                    " ",
                                    React.createElement(GroupIcon, null)) }),
                            React.createElement(TotalBox, { label: t('total-rewards'), value: React.createElement(ZigPriceLabel, { color: 'greenGraph', usd: true, showTooltip: true, variant: 'bigNumber', value: rewardsData.usdtEarned }) }),
                            React.createElement(TotalBox, { label: t('pending-rewards'), value: React.createElement(ZigPriceLabel, { color: 'yellow', usd: true, showTooltip: true, variant: 'bigNumber', value: rewardsData.usdtPending }) })))),
                    React.createElement(ReferralTable, { referrals: referrals.history })));
            } })));
};
export default Referrals;
//# sourceMappingURL=index.js.map