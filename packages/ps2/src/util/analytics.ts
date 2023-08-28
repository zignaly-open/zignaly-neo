import Analytics, { AnalyticsInstance } from 'analytics';
import * as Sentry from '@sentry/browser';
import { SessionsTypes, UserData } from '../apis/user/types';
import googleTagManager from '@analytics/google-tag-manager';
import customerIo from '@analytics/customerio';
import intercomPlugin from '@analytics/intercom';
import { getUnixTime } from 'date-fns';
import googleAnalytics from '@analytics/google-analytics';

let analytics: AnalyticsInstance | null = null;

if (process.env.REACT_APP_ENABLE_TRACKING === 'true') {
  const customerIoPlugin = customerIo({
    siteId: process.env.REACT_APP_CUSTOMER_IO_SITE_ID,
  });
  const originalInitialize = customerIoPlugin.initialize;

  customerIoPlugin.initialize = (args: unknown) => {
    originalInitialize.call(customerIoPlugin, args);
    const cio = document.getElementById('cio-tracker');
    cio?.setAttribute('data-use-in-app', 'true');
  };

  analytics = Analytics({
    app: 'zignaly',
    plugins: [
      googleTagManager({
        containerId: process.env.REACT_APP_GTM_ID,
      }),
      googleAnalytics({
        measurementIds: [process.env.REACT_APP_GA_ID],
      }),
      customerIoPlugin,
      intercomPlugin({
        appId: process.env.REACT_APP_INTERCOM_APP_ID,
      }),
    ],
  });
}

export const trackNewSession = (
  userData: UserData,
  eventType: SessionsTypes,
) => {
  try {
    const { email, userId, firstName, intercomHash, createdAt } = userData;
    analytics?.identify(userId, {
      email,
      name: firstName,
      created_at: getUnixTime(new Date(createdAt)),
    });
    if (window.intercomSettings) {
      window.intercomSettings.user_hash = intercomHash;
    }
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

export const trackPage = () => {
  analytics?.page();
};

export const twq = (userId: string) => {
  const twqWrapper = (eventKey: string, eventData: object = {}) => {
    if (process.env.REACT_APP_ENABLE_TRACKING === 'true') {
      window.twq?.('event', eventKey, {
        conversion_id: `${userId}_${Date.now()}`,
        contents: [{ content_id: userId }],
        ...eventData,
      });
    }
  };

  const trackVerify = () => {
    twqWrapper('tw-og0cu-og0hv');
  };

  const trackAllocation = () => {
    twqWrapper('tw-og0cu-og0hz');
  };

  return { trackVerify, trackAllocation };
};
