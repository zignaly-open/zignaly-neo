type tzData = {
  action: string;
  urlReferer?: string;
  urlDestination?: string;
  userId?: string | number;
  tzid?: string;
};

const sendTz = (data: tzData) => {
  const options = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return fetch(
    process.env.TZ_TRACKER_ENDPOINT || 'https://zignaly.com/new_api/tz',
    options,
  );
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

  return sendTz(data);
};

let referrer = document.referrer;

export const track = ({
  location = '',
  hash = '',
  userId = '',
}: {
  location?: string;
  hash?: string;
  userId?: string;
}) => {
  const url = new URL(location || window.location.href);
  url.hash = hash || url.hash?.split('?')[0];
  // we need a timeout to make sure thaat when a click and a track are triggered simultaneously, click always comes first
  // this is not the case with the click event, so gotta use mousedown
  // mousedown does come first, but these 50ms are here just in case
  setTimeout(() => {
    // this is to prevent the double track event sent thanks to react 18 double mount in dev mode
    if (url.toString() !== referrer)
      triggerTz(url.toString(), userId, referrer);
    referrer = url.toString();
  }, 50);
};

export const trackClick = ({
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
