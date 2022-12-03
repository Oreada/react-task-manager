import { URL_USERS } from '../../constants/constants';
import { UserInfo } from 'types/types';

//! Delete User
export async function deleteUser(token: string, idUser: string): Promise<UserInfo> {
  try {
    const response = await fetch(`${URL_USERS}/${idUser}`, {
      method: 'DELETE',
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
    throw err;
  }
}
