export const ROUTE_LOGIN = '/login';
export const ROUTE_USERS = '/users';
export const ROUTE_DEPOSITS = '/deposits';
export const ROUTE_WITHDRAWALS = '/withdrawals';
export const ROUTE_LOGS = '/logs';

// needed to safely redirect to the 1st whitelabel
export const ROUTE_CONFIG_REDIRECT = '/config';
export const ROUTE_CONFIG_PARENT = '/config/:wl';
export const ROUTE_CONFIG_PROFILE = ROUTE_CONFIG_PARENT + '/profile';
export const ROUTE_CONFIG_COMMUNICATION =
  ROUTE_CONFIG_PARENT + '/communication';
export const ROUTE_CONFIG_SETTINGS = ROUTE_CONFIG_PARENT + '/settings';
export const ROUTE_CONFIG_THEME = ROUTE_CONFIG_PARENT + '/theme';
