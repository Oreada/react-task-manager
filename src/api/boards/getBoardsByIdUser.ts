import { URL_BOARDS_SET } from '../../constants/constants';
import { Board } from 'types/types';

//! Get Boards where user is owner or one of invited
export async function getBoardsByIdUser(token: string, idUser: string): Promise<Array<Board>> {
  try {
    const response = await fetch(`${URL_BOARDS_SET}/${idUser}`, {
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

    const boardsList = await response.json();
    return boardsList;
  } catch (e: unknown) {
    const err = e as Error;
    console.log('Catched error =', err.message);
    throw new Error(err.message);
  }
}
