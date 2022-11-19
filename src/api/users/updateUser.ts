import { URL_USERS } from 'constants/constants';
import { BodyForSignUp, UserInfo } from 'types/types';

//! Update User
export async function updateUser(token: string, idUser: string, obj: BodyForSignUp): Promise<UserInfo> {
  try {
    const response = await fetch(`${URL_USERS}/${idUser}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(obj),
    });

    if (!response.ok) {
      throw new Error(`Request failed with status code ${response.status}`);
    }

    const userUpdated = await response.json();
    return userUpdated;
  } catch (e: unknown) {
    const err = e as Error;
    console.log('Catched error =', err.message);
    throw new Error(err.message);
  }
}
