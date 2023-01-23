import Analytics, { AnalyticsInstance } from 'analytics';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore missing typedefs
import segmentPlugin from '@analytics/segment';
import * as Sentry from '@sentry/browser';
import { SessionsTypes, UserData } from '../apis/user/types';

let analytics: AnalyticsInstance | null = null;

if (
  process.env.REACT_APP_SEGMENT_KEY &&
  process.env.REACT_APP_ENABLE_TRACKING === 'true'
) {
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

const pushGtmEvent = (payload: unknown): void => {
  window?.dataLayer?.push?.(payload);
};

export const trackNewSession = (
  userData: UserData,
  eventType: SessionsTypes,
) => {
  try {
    pushGtmEvent({ event: eventType, ...userData });
    const { email, userId, firstName, intercomHash, createdAt } = userData;
    analytics?.identify(
      userId,
      { email, name: firstName, created_at: +createdAt },
      {
        integrations: {
          Intercom: {
            user_hash: intercomHash,
          },
        },
      },
    );
    Sentry.setUser({ email, id: userId });
    if (eventType === SessionsTypes.Signup) {
      analytics?.track('newUser', { userId });
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }
};

export const trackEndSession = () => {
  Sentry.configureScope((scope) => scope?.setUser(null));
};

export const trackConversion = () => {
  const img = document.createElement('img');
  img.src =
    'https://cnv.event.prod.bidr.io/log/cnv?tag_id=88&buzz_key=askpermission&value=&segment_key=askpermission-142&account_id=2&order=&ord=' +
    Math.random();
  img.height = 0;
  img.width = 0;
  document.body.append(img);
};

export const trackPage = () => {
  analytics?.page();
};
