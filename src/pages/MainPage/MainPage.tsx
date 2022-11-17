import { signIn } from 'api/auth/signIn';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppDispatch, IRootState } from 'store/model';
import cls from './MainPage.module.scss';
import { BODY, BUTTON_INNER } from './constants';
import { createBoardThunk, getBoardsThunk } from 'store/mainSlice';

const MainPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { boards, isLoading } = useSelector((state: IRootState) => state.main);
  const { token, id } = useSelector((state: IRootState) => state.auth);

  useEffect(() => {
    const getBoardsWithSighUp = async () => {
      if (token) {
        dispatch(getBoardsThunk({ token }));
      }
    };

    getBoardsWithSighUp();
  }, [token, dispatch]);

  const handleClickCreateButton = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    if (token && id) {
      dispatch(
        createBoardThunk({
          token,
          body: {
            owner: id,
            users: [id],
            ...BODY,
          },
        })
      );
    }
  };

  return (
    <div className={cls.main}>
      <button onClick={handleClickCreateButton}>{BUTTON_INNER}</button>
      <div className={cls.boards}>
        {boards.map(({ _id, title }) => (
          <Link key={_id} to={`${_id}`}>
            {title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MainPage;
