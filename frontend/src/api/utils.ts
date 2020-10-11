const setToken = (token: string): void =>
  window.localStorage.setItem(process.env.REACT_APP_TOKEN as string, token);
const getToken = (): string | null =>
  window.localStorage.getItem(process.env.REACT_APP_TOKEN as string);

export {getToken, setToken};
