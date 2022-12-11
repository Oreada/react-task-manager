import { URL_SINGIN } from '../../constants/constants';
import { BodyForSignIn, SignInResult } from 'types/types';

//! Get token
export async function signIn(obj: BodyForSignIn): Promise<string> {
  try {
    const response = await fetch(URL_SINGIN, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj),
    });

    if (!response.ok) {
      throw new Error(`Request failed with status code ${response.status}`, {
        cause: response.status,
      });
    }

    const result: SignInResult = await response.json();
    const token = result.token;
    return token;
  } catch (e: unknown) {
    const err = e as Error;
    throw err;
  }
}
