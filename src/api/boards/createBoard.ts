import { URL_BOARDS } from '../../constants/constants';
import { Board, BodyForBoard } from 'types/types';

//! Create Board
export async function createBoard(token: string, obj: BodyForBoard): Promise<Board> {
  try {
    const response = await fetch(URL_BOARDS, {
      method: 'POST',
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

    const board = await response.json();
    return board;
  } catch (e: unknown) {
    const err = e as Error;
    console.log('Catched error =', err.message);
    throw new Error(err.message);
  }
}
