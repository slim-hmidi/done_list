import { format } from "date-fns";
export const isAuthenticated = () => {
  const token = window.localStorage.getItem(
    process.env.REACT_APP_TOKEN as string,
  );
  return !!token;
};

export const formatDate = (date: Date, dateFormat: string) =>
  format(date, dateFormat);
