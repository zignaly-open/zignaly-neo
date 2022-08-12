import ls from '@livesession/sdk';
import { UserData } from 'features/auth/types';

const isEnabled =
  process.env.REACT_APP_ENABLE_TRACKING &&
  process.env.REACT_APP_LIVE_SESSION_TRACK_ID;

export const startLiveSession = (user: UserData) => {
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

export const endLiveSession = () => {
  if (process.env.NEXT_PUBLIC_ENABLE_TRACKING) {
    ls.init(process.env.REACT_APP_LIVE_SESSION_TRACK_ID);
    ls.invalidateSession();
  }
};
