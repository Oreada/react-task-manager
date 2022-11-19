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
