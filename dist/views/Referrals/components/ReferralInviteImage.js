import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { QRCodeSVG } from 'qrcode.react';
import { ZignalyLogotype } from '@zignaly-open/ui';
import { ReactComponent as Envelope } from '../../../images/envelope-main.svg';
import { hardcodedInviteeReward } from '../constants';
var qrCodeWidth = 100;
var imageHeight = 600;
var imageWidth = 480;
var logoHeight = 70;
var qrCodePadding = 10;
var sidePadding = 35;
var qrCodeBorderRadius = 10;
var sectionRatio = 0.45;
var borderRadius = 15;
var ReferralInviteImage = function (_a) {
    var width = _a.width, mode = _a.mode, url = _a.url, urlShort = _a.urlShort;
    var t = useTranslation(['referrals', 'pages']).t;
    return (React.createElement("svg", { width: width || imageWidth, viewBox: "0 0 ".concat(imageWidth, " ").concat(imageHeight) },
        React.createElement("defs", null,
            React.createElement("clipPath", { id: 'round-corner' },
                React.createElement("rect", { x: '0', y: '0', width: imageWidth, height: imageHeight, rx: borderRadius, ry: borderRadius })),
            React.createElement("style", { type: 'text/css' }, "\n          \n          @font-face {\n            font-family: \"Avenir Next\";\n            src: url(\"/fonts/AvenirNext/AvenirNextLTPro-Regular.otf\");\n          }\n          \n          @font-face {\n            font-family: \"Avenir Next\";\n            src: url(\"../public/fonts/AvenirNext/AvenirNextLTPro-SemiBold.otf\");\n            font-weight: 700;\n          }\n          \n          * {\n            font-family: \"Avenir Next\";\n            line-height: 1.4;\n          }\n         \n          \n          ")),
        React.createElement("linearGradient", { id: 'bottomPartGradient', x1: 1, y1: 1, x2: 0, y2: 0 },
            React.createElement("stop", { offset: 0, stopColor: '#21133a' }),
            React.createElement("stop", { offset: 1, stopColor: '#332256' })),
        React.createElement("linearGradient", { id: 'ctaGradient', x1: 1, y1: 0, x2: 1, y2: 1 },
            React.createElement("stop", { offset: 0, stopColor: '#84ccd6' }),
            React.createElement("stop", { offset: 1, stopColor: '#a58fd8' })),
        React.createElement("linearGradient", { id: 'topPartGradient', x1: 0, y1: 0, x2: 1, y2: 1 },
            React.createElement("stop", { offset: 0, stopColor: '#110425' }),
            React.createElement("stop", { offset: 0.2, stopColor: '#382860' }),
            React.createElement("stop", { offset: 0.200001, stopColor: '#14082c' }),
            React.createElement("stop", { offset: 0.25, stopColor: '#100327' }),
            React.createElement("stop", { offset: 1, stopColor: '#21004d' })),
        React.createElement("rect", { "clip-path": 'url(#round-corner)', fill: 'url(#topPartGradient)', width: imageWidth, x: 0, y: 0, height: imageHeight / (1 + sectionRatio) }),
        React.createElement("rect", { "clip-path": 'url(#round-corner)', fill: 'url(#bottomPartGradient)', width: imageWidth, x: 0, y: imageHeight / (1 + sectionRatio), height: (sectionRatio * imageHeight) / (1 + sectionRatio) }),
        t("create-invite.".concat(mode, "-cta"))
            .split('\n')
            .map(function (text, i) { return (React.createElement("text", { key: "referral-cta-line-".concat(i), x: sidePadding, y: 2 * sidePadding + logoHeight + 43 + i * 50, fontFamily: "'Avenir Next', arial, sans-serif", fontSize: 38, fontWeight: 700, fill: 'url(#ctaGradient)' }, text)); }),
        React.createElement(Envelope, { width: (imageWidth - 3 * sidePadding) / 3, height: ((imageWidth - 3 * sidePadding) / 3 / 291) * 259, x: ((imageWidth - 3 * sidePadding) / 3) * 2 + 2 * sidePadding, y: 2 * sidePadding + logoHeight }),
        React.createElement(ZignalyLogotype, { y: sidePadding, x: sidePadding, height: logoHeight, width: logoHeight * 4 }),
        React.createElement("foreignObject", { x: sidePadding, y: imageHeight / (1 + sectionRatio) - 75 - sidePadding, width: imageWidth - 2 * sidePadding, height: 90 },
            React.createElement("div", { xmlns: 'http://www.w3.org/1999/xhtml', style: {
                    height: (sectionRatio * imageHeight) / (1 + sectionRatio) + 'px',
                    fontFamily: "'Avenir Next', arial, sans-serif",
                    lineHeight: 1.4,
                    fontSize: 23,
                    color: '#A9A9BA',
                } },
                React.createElement(Trans, { i18nKey: "create-invite.deposit-".concat(mode, "-cta"), t: t, values: {
                        depositAmount: hardcodedInviteeReward.threshold,
                    } },
                    React.createElement("span", { style: { color: '#a58fe5' } }),
                    React.createElement("span", { style: { color: '#a58fe5' } })))),
        React.createElement("foreignObject", { x: sidePadding, y: imageHeight / (1 + sectionRatio), width: imageWidth - 3 * sidePadding - 2 * qrCodePadding - qrCodeWidth, height: (sectionRatio * imageHeight) / (1 + sectionRatio) },
            React.createElement("div", { xmlns: 'http://www.w3.org/1999/xhtml', style: {
                    display: 'flex',
                    flexDirection: 'column',
                    height: (sectionRatio * imageHeight) / (1 + sectionRatio) + 'px',
                    flex: 1,
                    justifyContent: 'space-around',
                    fontFamily: "'Avenir Next', arial, sans-serif",
                    lineHeight: 1.4,
                } },
                React.createElement("div", null,
                    React.createElement("span", { style: { color: '#A9A9BA', fontSize: 20 } }, t('create-invite.scan-qr')),
                    React.createElement("br", null),
                    React.createElement("span", { style: { color: '#a58fe5', fontSize: 14 } }, urlShort
                        .replace(/https?:\/\//, '')
                        .replace(/(?:test|staging)-app\./, 'app.'))))),
        React.createElement("g", null,
            React.createElement("rect", { rx: qrCodeBorderRadius, ry: qrCodeBorderRadius, x: imageWidth - qrCodeWidth - 2 * qrCodePadding - sidePadding, y: ((1 + 0.5 * sectionRatio) * imageHeight) / (1 + sectionRatio) -
                    qrCodeWidth / 2 -
                    qrCodePadding, width: qrCodeWidth + 2 * qrCodePadding, height: qrCodeWidth + 2 * qrCodePadding, fill: '#fff' }),
            React.createElement(QRCodeSVG, { y: ((1 + 0.5 * sectionRatio) * imageHeight) / (1 + sectionRatio) -
                    qrCodeWidth / 2, x: imageWidth - qrCodeWidth - qrCodePadding - sidePadding, height: qrCodeWidth, size: qrCodeWidth, value: url }))));
};
export default ReferralInviteImage;
//# sourceMappingURL=ReferralInviteImage.js.map