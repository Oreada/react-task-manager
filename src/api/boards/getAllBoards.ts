import { URL_BOARDS } from '../../constants/constants';
import { Board } from 'types/types';

//! Get all Boards on server
export async function getAllBoards(token: string): Promise<Array<Board>> {
  try {
    const response = await fetch(URL_BOARDS, {
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
