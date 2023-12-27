// just a tiny abstraction layer for when we need to shoe something in the state
export const junkyard = {
  set: (name: junkyardResidentLocalStorage, value: string) =>
    localStorage.setItem(name, value),
  get: (name: junkyardResidentLocalStorage) => localStorage.getItem(name),
  setSession: (name: junkyardResidentSessionStorage, value: string) =>
    sessionStorage.setItem(name, value),
  getSession: (name: junkyardResidentSessionStorage) =>
    sessionStorage.getItem(name),
};

export type junkyardResidentLocalStorage = 'hasLoggedIn';
export type junkyardResidentSessionStorage = 'missedRoute';
