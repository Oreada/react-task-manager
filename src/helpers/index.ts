import { TIME_LIFE_TOKEN } from '../constants/constants';

export const readFromLocal = <Type>(key: string): Type => {
  const local = localStorage.getItem(key);
  return local !== null ? JSON.parse(local) : null;
};

export const saveToLocal = <Type>(key: string, content: Type): void => {
  localStorage.setItem(key, JSON.stringify(content));
};

export const removeLocal = (key: string): void => {
  localStorage.removeItem(key);
};

export const checkLifeTimeToken = (date: number): boolean => {
  const res = (Date.now() - date) / 1000 < TIME_LIFE_TOKEN;
  console.log(res, Date.now() - date, TIME_LIFE_TOKEN);

  return res;
};
