import Analytics, { AnalyticsInstance } from 'analytics';
// @ts-ignore missing typedefs
import segmentPlugin from '@analytics/segment';
import { SessionsTypes, UserData } from '../features/auth/types';

let analytics: AnalyticsInstance | null = null;

if (
  process.env.REACT_APP_SEGMENT_KEY &&
  process.env.REACT_APP_ENABLE_TRACKING
) {
  analytics = Analytics({
    app: process.env.REACT_APP_SEGMENT_NAME || 'zignaly',
    plugins: [
      segmentPlugin({
        writeKey: process.env.REACT_APP_SEGMENT_KEY,
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
  pushGtmEvent({ event: eventType, ...userData });
  const { email, userId } = userData;
  analytics?.identify(userId, { email });
  if (eventType === SessionsTypes.Signup) {
    analytics?.track('newUser', { userId });
  }
};
