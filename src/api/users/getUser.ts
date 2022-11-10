import { URL_ALL_USERS } from 'constants/constants';
import { UserInfo } from 'types/types';

//! Find User
export async function getUser(token: string, idUser: string): Promise<UserInfo> {
  try {
    const response = await fetch(`${URL_ALL_USERS}/${idUser}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Request failed with status code ${response.status}`);
    }

    const user = await response.json();
    return user;
  } catch (e: unknown) {
    const err = e as Error;
    console.log('Catched error =', err.message);
    throw new Error(err.message);
  }
}
