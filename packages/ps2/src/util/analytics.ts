import Analytics, { AnalyticsInstance } from 'analytics';
import * as Sentry from '@sentry/browser';
import { SessionsTypes, UserData } from '../apis/user/types';
import googleTagManager from '@analytics/google-tag-manager';
import customerIo from '@analytics/customerio';
import intercomPlugin from '@analytics/intercom';
import { getUnixTime } from 'date-fns';

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
        dataLayerName: 'test',
      }),
      customerIoPlugin,
      intercomPlugin({
        appId: process.env.REACT_APP_INTERCOM_APP_ID,
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
