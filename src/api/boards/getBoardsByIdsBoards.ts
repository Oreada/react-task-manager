import { URL_BOARDS_SET } from 'constants/constants';
import { Board } from 'types/types';

//! Get Boards by list of boardId
//! Если передать неверный ID в списке, ошибки не будет, получим Boards только по верным ID
export async function getBoardsByIdsBoards(token: string, idsBoards: Array<string>): Promise<Array<Board>> {
  try {
    const queryFormatted = JSON.stringify(idsBoards);

    const response = await fetch(`${URL_BOARDS_SET}?ids=${queryFormatted}`, {
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
