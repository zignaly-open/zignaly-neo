const doFetchTime = async () => {
  const requestDate = Date.now();

  const response = await fetch(process.env.REACT_APP_TIME_URL, {
    cache: `no-store`,
  });

  if (!response.ok) {
    throw new Error(`Bad date from server: ${response.statusText}`);
  }
  const json = await response.json();

  return {
    requestDate,
    responseDate: Date.now(),
    serverDate: json.time,
  };
};

const LATENCY_THRESHOLD = 6000;

let best = {
  offset: 0,
  latency: 0,
};

const fetchTime = async () => {
  // Get server time to calculate real time, up to 10 times in case there is too much latency
  // making it less accurate.
  for (let index = 0; index < 10; index++) {
    try {
      const { requestDate, responseDate, serverDate } = await doFetchTime();
      const latency = responseDate - requestDate;

      const offset = Date.now() - serverDate - Math.floor(latency / 2);

      // eslint-disable-next-line no-console
      console.log(
        'requestDate:',
        requestDate,
        '\nresponseDate:',
        responseDate,
        '\nlatency:',
        responseDate - requestDate,
        '\nserverDate:',
        serverDate,
        '\noffset:',
        offset,
      );
      if (!best.latency || latency < best.latency) {
        best = {
          offset,
          latency,
        };
      }

      if (latency <= LATENCY_THRESHOLD) {
        return;
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  }
};

export default {
  fetchTime,
  getOffset: () => best.offset,
};
