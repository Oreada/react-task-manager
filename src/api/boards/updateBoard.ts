import { URL_BOARDS } from 'constants/constants';
import { Board, BodyForBoard } from 'types/types';

//! Update Board
export async function updateBoard(token: string, idBoard: string, obj: BodyForBoard): Promise<Board> {
  try {
    const response = await fetch(`${URL_BOARDS}/${idBoard}`, {
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

    const boardUpdated = await response.json();
    return boardUpdated;
  } catch (e: unknown) {
    const err = e as Error;
    console.log('Catched error =', err.message);
    throw new Error(err.message);
  }
}
