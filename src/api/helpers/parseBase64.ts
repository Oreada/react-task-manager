import { UserDecoder } from 'types/types';

interface IParseBase64 {
  (token: string): UserDecoder;
}

export const parseBase64: IParseBase64 = (token) => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map((symbol) => '%' + `00${symbol.charCodeAt(0).toString(16)}`.slice(-2))
      .join('')
  );

  return JSON.parse(jsonPayload);
};
