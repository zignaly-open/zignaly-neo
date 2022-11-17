import useCurrentUser from 'hooks/useCurrentUser';

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
export const triggerTz = async (location: string, address?: string) => {
  if (process.env.REACT_APP_ENABLE_TRACKING !== 'true') return;

  const data = {
    action: 'sData',
    urlReferer: document.referrer,
    urlDestination: location,
    userId: address,
    tid: localStorage.getItem('tid'),
  };

  if (!data.tid) {
    // get tid
    sendTz({
      action: 'gTid',
    }).then(async (response) => {
      const json = await response.json();
      if (!response.ok) {
        const customError = json.error || json;
        throw customError;
      }
      data.tid = json;
      localStorage.setItem('tid', json);
      sendTz(data);
    });
  } else {
    sendTz(data);
  }
};

const composeHash = (originalHash: string, ctaId: string) => {
  let hash = originalHash;
  if (ctaId) {
    hash += `?ctaId=${ctaId}`;
  }
  return hash;
};

/**
 * Trigger internal tracking event.
 */
export const useTz = () => {
  const { user } = useCurrentUser();

  return (ctaId?: string) => {
    const urlString = window.location.href;
    const url = new URL(urlString);
    const hash = window.location.href.split('#')[1]?.split('?')[0];
    url.hash = composeHash(hash ?? '', ctaId);
    triggerTz(url.toString(), user.publicAddress);
  };
};
