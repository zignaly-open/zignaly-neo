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

export const getMissedDestinationUrl = () => junkyard.getSession('missedRoute');
export const clearMissedDestinationUrl = () =>
  junkyard.setSession('missedRoute', '');
