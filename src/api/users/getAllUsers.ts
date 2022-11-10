import { URL_ALL_USERS } from 'constants/constants';
import { UserInfo } from 'types/types';

//! Get all Users on server
export async function getAllUsers(token: string): Promise<Array<UserInfo>> {
  try {
    const response = await fetch(URL_ALL_USERS, {
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

    const usersList = await response.json();
    return usersList;
  } catch (e: unknown) {
    const err = e as Error;
    console.log('Catched error =', err.message);
    throw new Error(err.message);
  }
}
