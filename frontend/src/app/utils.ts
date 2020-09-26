export const isAuthenticated = () => {
  const token = window.localStorage.getItem(
    process.env.REACT_APP_TOKEN as string,
  );
  return !!token;
};
