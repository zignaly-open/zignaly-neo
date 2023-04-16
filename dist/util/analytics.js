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
import Analytics from 'analytics';
import segmentPlugin from '@analytics/segment';
import * as Sentry from '@sentry/browser';
import { SessionsTypes } from '../apis/user/types';
var analytics = null;
if (process.env.REACT_APP_SEGMENT_KEY &&
    process.env.REACT_APP_ENABLE_TRACKING === 'true') {
    analytics = Analytics({
        app: process.env.REACT_APP_SEGMENT_NAME || 'zignaly',
        plugins: [
            segmentPlugin({
                writeKey: process.env.REACT_APP_SEGMENT_KEY,
                customScriptSrc: process.env.REACT_APP_SEGMENT_SCRIPT_SRC,
            }),
        ],
    });
}
var pushGtmEvent = function (payload) {
    var _a, _b;
    (_b = (_a = window === null || window === void 0 ? void 0 : window.dataLayer) === null || _a === void 0 ? void 0 : _a.push) === null || _b === void 0 ? void 0 : _b.call(_a, payload);
};
export var trackNewSession = function (userData, eventType) {
    var _a;
    try {
        pushGtmEvent(__assign({ event: eventType }, userData));
        var email = userData.email, userId = userData.userId, firstName = userData.firstName, intercomHash = userData.intercomHash, createdAt = userData.createdAt;
        analytics === null || analytics === void 0 ? void 0 : analytics.identify(userId, { email: email, name: firstName, created_at: +createdAt }, {
            integrations: {
                Intercom: {
                    user_hash: intercomHash,
                },
            },
        });
        (_a = _cio === null || _cio === void 0 ? void 0 : _cio.identify) === null || _a === void 0 ? void 0 : _a.call(_cio, { email: email, id: userId, name: firstName });
        Sentry.setUser({ email: email, id: userId });
        if (eventType === SessionsTypes.Signup) {
            analytics === null || analytics === void 0 ? void 0 : analytics.track('newUser', { userId: userId });
        }
    }
    catch (e) {
        console.error(e);
    }
};
export var trackEndSession = function () {
    Sentry.configureScope(function (scope) { return scope === null || scope === void 0 ? void 0 : scope.setUser(null); });
};
export var trackConversion = function () {
    var img = document.createElement('img');
    img.src =
        'https://cnv.event.prod.bidr.io/log/cnv?tag_id=88&buzz_key=askpermission&value=&segment_key=askpermission-142&account_id=2&order=&ord=' +
            Math.random();
    img.height = 0;
    img.width = 0;
    document.body.append(img);
};
export var trackPage = function () {
    analytics === null || analytics === void 0 ? void 0 : analytics.page();
};
//# sourceMappingURL=analytics.js.map