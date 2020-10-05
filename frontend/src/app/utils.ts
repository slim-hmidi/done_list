import { format } from "date-fns";
export const isAuthenticated = () => {
  const token = window.localStorage.getItem(
    process.env.REACT_APP_TOKEN as string,
  );
  return !!token;
};

export const formatDate = (date: Date, dateFormat: string) =>
  format(date, dateFormat);

export const debounce = (
  func: (...args: any[]) => any,
  timeout: number,
): (...args: any[]) => void => {
  let timer: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, timeout);
  };
};
