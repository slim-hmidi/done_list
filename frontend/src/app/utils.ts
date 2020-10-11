import {format} from 'date-fns';

export const isAuthenticated = (): boolean => {
  const token = window.localStorage.getItem(
    process.env.REACT_APP_TOKEN as string,
  );
  return !!token;
};

export const formatDate = (date: Date, dateFormat: string): string =>
  format(date, dateFormat);

export const debounce = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  func: (...args: any[]) => any,
  timeout: number,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): ((...args: any[]) => void) => {
  let timer: NodeJS.Timeout;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, timeout);
  };
};
