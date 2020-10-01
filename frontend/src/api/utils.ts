const setToken = (token: string) =>
  window.localStorage.setItem(
    process.env.REACT_APP_TOKEN as string,
    token,
  );
const getToken = () =>
  window.localStorage.getItem(process.env.REACT_APP_TOKEN as string);

export {
  getToken,
  setToken,
};
