const localStorageKey = 'zigraffleAuthToken';

let accessToken: string =
  localStorage.getItem(localStorageKey)?.toString() || '';

export function setToken(token: string): void {
  accessToken = token;
  // localStorage.setItem(localStorageKey, token);
}

export function getToken(): string {
  return accessToken;
}
