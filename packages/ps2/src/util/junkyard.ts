// just a tiny abstraction layer for when we need to shoe something in the state
export const junkyard = {
  set: (name: string, value: string) => localStorage.setItem(name, value),
  get: (name: string) => localStorage.getItem(name),
  setSession: (name: string, value: string) =>
    sessionStorage.setItem(name, value),
  getSession: (name: string) => sessionStorage.getItem(name),
};
