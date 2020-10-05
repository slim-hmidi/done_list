import { format } from "date-fns";
export const isAuthenticated = () => {
  const token = window.localStorage.getItem(
    process.env.REACT_APP_TOKEN as string,
  );
  return !!token;
};

export const formatDate = (date: Date, dateFormat: string) =>
  format(date, dateFormat);

export const debounce = <F extends ((...args: any[]) => any)>(
  func: F,
  waitFor: number,
) => {
  let timeout: number = 0;

  const debounced = (...args: any[]) => {
    clearTimeout(timeout);
    setTimeout(() => func(...args), waitFor);
  };

  return debounced as (...args: Parameters<F>[]) => ReturnType<F>;
};
