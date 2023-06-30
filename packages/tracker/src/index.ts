type tzData = {
  action: string;
  urlReferer?: string;
  urlDestination?: string;
  userId?: string | number;
  tzid?: string;
};

const lastDelayedTrack = {
  event: null as tzData,
  timeout: null as ReturnType<typeof setTimeout>,
};

const sendTz = (data: tzData) => {
  const options = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return fetch('https://zignaly.com/new_api/tz', options);
};

const delayTimeout = 100;

/**
 * We have a problem with delayed track
 * because we track buttons and links AND we track url changed
 * @param data
 */
const sendTzDelayed = (data: tzData) => {
  if (
    lastDelayedTrack.event?.userId === data?.userId &&
    data.urlDestination?.indexOf(
      lastDelayedTrack.event?.urlDestination + '#',
    ) === 0
  ) {
    // if the timeout has already executed, no harm no foul
    clearTimeout(lastDelayedTrack.timeout);
  }
  lastDelayedTrack.event = data;
  lastDelayedTrack.timeout = setTimeout(() => sendTz(data), delayTimeout);
};

/**
 * Trigger internal tracking event.
 */
const triggerTz = async (
  location: string,
  userId?: string,
  referrer?: string,
) => {
  if (process.env.REACT_APP_ENABLE_TRACKING !== 'true') return;

  const data = {
    action: 'sData',
    urlReferer: referrer,
    urlDestination: location,
    userId,
    tid: localStorage.getItem('tid'),
  };

  if (!data.tid) {
    // get tid
    const response = await sendTz({
      action: 'gTid',
    });
    const json = await response.text();
    if (!response.ok) {
      throw json;
    }
    data.tid = json;
    localStorage.setItem('tid', json);
  }

  await sendTzDelayed(data);
};

let referrer = document.referrer;

export const track = ({
  location = '',
  ctaId = '',
  hash = '',
  modal = false,
  userId = '',
}: {
  location?: string;
  hash?: string;
  ctaId?: string;
  modal?: boolean;
  userId?: string;
}) => {
  const url = new URL(location || window.location.href);
  url.hash =
    (hash || url.hash?.split('?')[0]) +
    (ctaId || modal ? '?' : '') +
    (ctaId ? `ctaId=${ctaId}&` : '') +
    (modal ? `modal` : '');
  triggerTz(url.toString(), userId, referrer);
  referrer = url.toString();
};

export const trackCta = ({
  ctaId = '',
  userId,
}: {
  ctaId: string;
  userId?: string;
}) => {
  const url = new URL(referrer);
  url.hash = url.hash?.split('?')[0] + `?ctaId=${ctaId}`;
  triggerTz(url.toString(), userId, referrer);
};
