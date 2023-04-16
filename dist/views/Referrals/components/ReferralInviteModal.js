var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ZModal from '../../../components/ZModal';
import { FacebookShareButton, EmailShareButton, TwitterShareButton, TelegramShareButton, LinkedinShareButton, WhatsappShareButton, } from 'react-share';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import FacebookIcon from '@mui/icons-material/Facebook';
import DownloadIcon from '@mui/icons-material/DownloadForOffline';
import TwitterIcon from '@mui/icons-material/Twitter';
import TelegramIcon from '@mui/icons-material/Telegram';
import LinkedinIcon from '@mui/icons-material/LinkedIn';
import WhatsappIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import { Box, Grid } from '@mui/material';
import { ZigInput, ZigTab, ZigTabPanel, ZigTabs } from '@zignaly-open/ui';
import copy from 'copy-to-clipboard';
import { useToast } from '../../../util/hooks/useToast';
import { ShareIconsContainer } from '../styles';
import ReferralInviteNewImage from './ReferralInviteNewImage';
import { downloadSvgElementAsPngImage, downloadSvgElementAsSvgImage, } from 'util/images';
import { hardcodedInviteeReward } from '../constants';
var ReferralInviteModal = function (_a) {
    var url = _a.url, urlShort = _a.urlShort, props = __rest(_a, ["url", "urlShort"]);
    var t = useTranslation(['referrals', 'pages']).t;
    var _b = useState(0), tab = _b[0], setTab = _b[1];
    var _c = useState(t('create-invite.invite-text-friend', {
        depositThreshold: hardcodedInviteeReward.threshold,
        reward: hardcodedInviteeReward.value,
    })), friendText = _c[0], setFriendText = _c[1];
    var _d = useState(t('create-invite.invite-text-trader', {
        depositThreshold: hardcodedInviteeReward.threshold,
        reward: hardcodedInviteeReward.value,
    })), traderText = _d[0], setTraderText = _d[1];
    var _e = tab === 0 ? [friendText, setFriendText] : [traderText, setTraderText], text = _e[0], setText = _e[1];
    var imageWrapper = useRef();
    var toast = useToast();
    var download = function () {
        var _a, _b;
        try {
            downloadSvgElementAsPngImage((_a = imageWrapper === null || imageWrapper === void 0 ? void 0 : imageWrapper.current) === null || _a === void 0 ? void 0 : _a.querySelector('svg'), 'zignaly-invite.png', 3);
        }
        catch (e) {
            downloadSvgElementAsSvgImage((_b = imageWrapper === null || imageWrapper === void 0 ? void 0 : imageWrapper.current) === null || _b === void 0 ? void 0 : _b.querySelector('svg'), 'zignaly-invite.svg');
        }
    };
    var copyLink = function () {
        copy(url);
        toast.success(t('action:copied'));
    };
    return (React.createElement(ZModal, __assign({ wide: true }, props),
        React.createElement(ZigTabs, { sx: {
                margin: '0 auto',
            }, onChange: function (_, newValue) {
                setTab(newValue);
            }, value: tab },
            React.createElement(ZigTab, { label: t('create-invite.invite-friends'), id: 'create-invite__friends' }),
            React.createElement(ZigTab, { label: t('create-invite.invite-traders'), id: 'create-invite__traders' })),
        React.createElement(Grid, { container: true },
            React.createElement(Grid, { item: true, xs: 12, sm: 6, columnSpacing: 2 },
                React.createElement(Box, { ref: imageWrapper },
                    React.createElement(ZigTabPanel, { value: tab, index: 0 },
                        React.createElement(ReferralInviteNewImage, { url: url, mode: 'friend' })),
                    React.createElement(ZigTabPanel, { value: tab, index: 1 },
                        React.createElement(ReferralInviteNewImage, { url: url, mode: 'trader' })))),
            React.createElement(Grid, { item: true, xs: 12, sm: 6, sx: {
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '30px',
                    justifyContent: 'center',
                } },
                React.createElement(Box, { sx: {
                        margin: '0 auto',
                        pl: 3,
                        pr: 3,
                    } },
                    React.createElement("svg", { width: 0, height: 0 },
                        React.createElement("linearGradient", { id: 'shareIconGradient', x1: 1, y1: 0, x2: 1, y2: 1 },
                            React.createElement("stop", { offset: 0, stopColor: '#149cad' }),
                            React.createElement("stop", { offset: 1, stopColor: '#4540c1' })))),
                React.createElement(Box, null,
                    React.createElement(ZigInput, { wide: true, id: 'create-invite__invitation-text', label: t('create-invite.customize-text'), rows: 6, multiline: true, value: text, onChange: function (e) { return setText(e.target.value); } })),
                React.createElement(ShareIconsContainer, null,
                    React.createElement(DownloadIcon, { id: 'create-invite__download-image', sx: { cursor: 'pointer' }, onClick: download }),
                    React.createElement(InsertLinkIcon, { id: 'create-invite__copy-link', sx: { cursor: 'pointer' }, onClick: copyLink }),
                    React.createElement(TwitterShareButton, { id: 'create-invite__twitter', url: url, title: text },
                        React.createElement(TwitterIcon, null)),
                    React.createElement(TelegramShareButton, { id: 'create-invite__telegram', url: url, title: text },
                        React.createElement(TelegramIcon, null)),
                    React.createElement(FacebookShareButton, { id: 'create-invite__facebook', quote: text, url: url },
                        React.createElement(FacebookIcon, null)),
                    React.createElement(WhatsappShareButton, { id: 'create-invite__whatsapp', url: url, title: text },
                        React.createElement(WhatsappIcon, null)),
                    React.createElement(EmailShareButton, { id: 'create-invite__email', subject: t('share.email-subject'), body: text, url: url },
                        React.createElement(EmailIcon, null)),
                    React.createElement(LinkedinShareButton, { id: 'create-invite__linkedin', url: url, title: text },
                        React.createElement(LinkedinIcon, null)))))));
};
export default ReferralInviteModal;
//# sourceMappingURL=ReferralInviteModal.js.map