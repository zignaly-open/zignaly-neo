import { junkyard } from './junkyard';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export type RedirectLocationState = {
  redirectTo?: Location;
};

export const useMaybeSaveMissedDestinationUrl = () => {
  const { state: locationState, search } = useLocation();
  useEffect(() => {
    const explicitDestination = new URLSearchParams(search).get('destination');
    const { redirectTo } = (locationState || {}) as RedirectLocationState;
    const result =
      explicitDestination ||
      (redirectTo && `${redirectTo.pathname}${redirectTo.search}`) ||
      null;

    if (result) junkyard.setSession('missedRoute', result);
  }, []);
};

export const popMissedDestinationUrl = () => {
  const value = junkyard.getSession('missedRoute');
  // we need a timeout here for it to work in the dev mode
  // because of strict mode double render shenanigans
  // works fine without the timeout in prod
  setTimeout(() => junkyard.setSession('missedRoute', ''), 0);
  return value;
};
