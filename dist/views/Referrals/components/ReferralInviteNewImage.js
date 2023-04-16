import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { QRCodeSVG } from 'qrcode.react';
import { ReactComponent as InviteTemplate } from '../../../images/invite-template.svg';
import { useCurrentUser } from '../../../apis/user/use';
import { hardcodedInviteeReward } from '../constants';
var qrCodeWidth = 125;
var imageHeight = 745;
var imageWidth = 575;
var qrCodePadding = 10;
var sidePadding = 53;
var qrCodeBorderRadius = 10;
var ReferralInviteNewImage = function (_a) {
    var mode = _a.mode, url = _a.url;
    var t = useTranslation(['referrals', 'pages']).t;
    var refCode = useCurrentUser().refCode;
    return (React.createElement("svg", { height: 389, width: 300, viewBox: "0 0 ".concat(imageWidth, " ").concat(imageHeight) },
        React.createElement("defs", null,
            React.createElement("style", { type: 'text/css' }, "\n          \n          @font-face {\n            font-family: \"Avenir Next\";\n            src: url(\"/fonts/AvenirNext/AvenirNextLTPro-Regular.otf\");\n          }\n          \n          @font-face {\n            font-family: \"Avenir Next\";\n            src: url(\"../public/fonts/AvenirNext/AvenirNextLTPro-SemiBold.otf\");\n            font-weight: 700;\n          }\n          \n          * {\n            font-family: \"Avenir Next\", arial, sans-serif\";\n            line-height: 1.4;\n          }\n         \n          \n          ")),
        React.createElement(InviteTemplate, { x: 0, y: 0, height: imageHeight, width: imageWidth }),
        React.createElement("foreignObject", { x: sidePadding, y: 130, width: 423, height: 150 },
            React.createElement("div", { xmlns: 'http://www.w3.org/1999/xhtml', style: {
                    fontFamily: "'Avenir Next', arial, sans-serif",
                    lineHeight: 1.4,
                    fontSize: 38,
                    fontWeight: 700,
                    color: '#fff',
                } },
                React.createElement(Trans, { i18nKey: 'create-invite.ugly-' + mode + '-cta', t: t, values: {
                        depositAmount: hardcodedInviteeReward.threshold,
                        reward: hardcodedInviteeReward.value,
                    } },
                    React.createElement("span", { style: { color: '#ACB6FF' } }),
                    React.createElement("span", { style: { color: '#ACB6FF' } })))),
        React.createElement("foreignObject", { x: sidePadding, y: 255, width: 423, height: 175 },
            React.createElement("div", { xmlns: 'http://www.w3.org/1999/xhtml', style: {
                    fontFamily: "'Avenir Next', arial, sans-serif",
                    lineHeight: 1.4,
                    fontSize: 30,
                    color: '#fff',
                } },
                React.createElement(Trans, { i18nKey: "create-invite.deposit-".concat(mode, "-cta"), t: t, values: {
                        depositAmount: hardcodedInviteeReward.threshold,
                    } },
                    React.createElement("span", { style: { fontWeight: 700 } }),
                    React.createElement("span", { style: { fontWeight: 700 } })))),
        React.createElement("foreignObject", { x: sidePadding, y: 600, width: imageWidth - 2 * sidePadding - 2 * qrCodePadding - qrCodeWidth, height: 100 },
            React.createElement("div", { xmlns: 'http://www.w3.org/1999/xhtml', style: {
                    fontFamily: "'Avenir Next', arial, sans-serif",
                    lineHeight: 1.4,
                    fontSize: 25,
                    color: '#191940',
                } },
                React.createElement("div", null,
                    React.createElement(Trans, { i18nKey: 'create-invite.scan-join', t: t },
                        React.createElement("span", { style: { fontWeight: 700 } })),
                    React.createElement("br", null),
                    React.createElement(Trans, { i18nKey: 'create-invite.invite-code', t: t, values: {
                            code: refCode,
                        } },
                        React.createElement("span", { style: { fontWeight: 700 } }))))),
        React.createElement("g", null,
            React.createElement("rect", { rx: qrCodeBorderRadius, ry: qrCodeBorderRadius, x: imageWidth - qrCodeWidth - 2 * qrCodePadding - sidePadding, y: 580, width: qrCodeWidth + 2 * qrCodePadding, height: qrCodeWidth + 2 * qrCodePadding, fill: '#fff' }),
            React.createElement(QRCodeSVG, { y: 580 + qrCodePadding, x: imageWidth - qrCodeWidth - qrCodePadding - sidePadding, height: qrCodeWidth, size: qrCodeWidth, value: url }))));
};
export default ReferralInviteNewImage;
//# sourceMappingURL=ReferralInviteNewImage.js.map