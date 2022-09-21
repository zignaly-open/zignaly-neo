type tzData = {
  action: string;
  urlReferer?: string;
  urlDestination?: string;
  userId?: string;
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
export const triggerTz = async (location: string, prevLocation?: string) => {
  if (process.env.REACT_APP_ENABLE_TRACKING !== 'true') return;

  const data = {
    action: 'sData',
    urlReferer: prevLocation || document.referrer,
    urlDestination: location,
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
