const doFetchTime = async () => {
  const requestDate = Date.now();

  const url =
    process.env.REACT_APP_GRAPHQL.substring(
      0,
      process.env.REACT_APP_GRAPHQL.lastIndexOf('/'),
    ) + '/time';

  const response = await fetch(url, {
    cache: `no-store`,
  });

  if (!response.ok) {
    throw new Error(`Bad date sample from server: ${response.statusText}`);
  }
  const json = await response.json();

  return {
    requestDate,
    responseDate: Date.now(),
    serverDate: json.time,
  };
};

const ACCEPT_LATENCY = 6000;

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

      const offset = Date.now() - serverDate - latency;

      if (!best.latency || latency < best.latency) {
        best = {
          offset,
          latency,
        };
      }

      if (latency < ACCEPT_LATENCY) {
        return;
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  }
};

export default {
  fetchTime,
  getOffset: () => best.offset,
};
