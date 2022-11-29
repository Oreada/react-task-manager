import { FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBoardThunk } from 'store/mainSlice';
import { AppDispatch, IRootState } from 'store/model';

export const useHandleClickCreateBoard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { token, id: idUser } = useSelector((state: IRootState) => state.auth);

  const createBord = (event: FormEvent<HTMLFormElement>, title: string, description: string) => {
    event.preventDefault();

    if (token && idUser) {
      const boardBody = {
        owner: idUser,
        users: [idUser],
        description: description,
        title: title,
      };
      dispatch(
        createBoardThunk({
          token,
          body: boardBody,
        })
      );
    }
  };

  return createBord;
};
