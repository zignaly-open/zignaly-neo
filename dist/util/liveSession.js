import ls from '@livesession/sdk';
var isEnabled = process.env.REACT_APP_ENABLE_TRACKING &&
    process.env.REACT_APP_LIVE_SESSION_TRACK_ID;
export var startLiveSession = function (user) {
    if (isEnabled) {
        ls.init(process.env.REACT_APP_LIVE_SESSION_TRACK_ID);
        ls.identify({
            name: user.firstName,
            email: user.email,
            params: {
                userId: user.userId,
                exchangeConnected: user.binanceConnected,
                providerEnabled: user.providerEnable,
                openCount: user.buysCount,
                closeCount: user.sellsCount,
                hasActivated: user.hasActivated,
            },
        });
        ls.newPageView();
    }
};
export var endLiveSession = function () {
    if (process.env.NEXT_PUBLIC_ENABLE_TRACKING) {
        ls.init(process.env.REACT_APP_LIVE_SESSION_TRACK_ID);
        ls.invalidateSession();
    }
};
//# sourceMappingURL=liveSession.js.map