import { URL_SINGUP } from '../../constants/constants';
import { BodyForSignUp, UserInfo } from 'types/types';

//! Create new User
export async function signUp(obj: BodyForSignUp): Promise<UserInfo> {
  try {
    const response = await fetch(URL_SINGUP, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj),
    });

    if (!response.ok) {
      // throw new Error(`Request failed with status code ${response.status}`);
      throw new Error(`Request failed with status code ${response.status}`, {
        cause: response.status,
      });
    }

    const newUser: UserInfo = await response.json();
    console.log('Created user =', newUser);
    return newUser;
  } catch (e: unknown) {
    const err = e as Error;
    console.log('Catched error =', err.message);
    throw err;
  }
}
