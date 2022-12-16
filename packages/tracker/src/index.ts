type tzData = {
  action: string;
  urlReferer?: string;
  urlDestination?: string;
  userId?: string | number;
  tzid?: string;
};

/**
 * Send tz action.
 */
const sendTz = (data: tzData) => {
  const options = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return fetch('https://zignaly.com/api/fe/tz.php', options);
};

/**
 * Trigger internal tracking event.
 */
const triggerTz = async (location: string, userId?: string) => {
  if (process.env.REACT_APP_ENABLE_TRACKING !== 'true') return;

  const data = {
    action: 'sData',
    urlReferer: document.referrer,
    urlDestination: location,
    userId,
    tid: localStorage.getItem('tid'),
  };

  if (!data.tid) {
    // get tid
    const response = await sendTz({
      action: 'gTid',
    });
    const json = await response.json();
    if (!response.ok) {
      throw json.error || json;
    }
    data.tid = json;
    localStorage.setItem('tid', json);
  }

  await sendTz(data);
};

export const track = ({
  location = '',
  ctaId = '',
  hash = '',
  userId = '',
}: {
  location?: string;
  hash?: string;
  ctaId?: string;
  userId?: string;
}) => {
  const url = new URL(location || window.location.href);
  url.hash =
    (hash || url.hash?.split('?')[0]) + (ctaId ? `?ctaId=${ctaId}` : '');
  triggerTz(url.toString(), userId);
};
