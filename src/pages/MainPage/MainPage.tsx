import { signIn } from 'api/auth/signIn';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppDispatch, IRootState } from 'store/model';
import cls from './MainPage.module.scss';
import { BODY, BUTTON_INNER, USER } from './constants';
import { CURRENT_TOKEN } from 'constants/constants';
import { createBoardThunk, getBoardsThunk } from 'store/mainSlice';

const MainPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { boards, isLoading } = useSelector((state: IRootState) => state.main);

  useEffect(() => {
    const getBoardsWithSighUp = async () => {
      // const token = await signIn(USER);
      // console.log(token);
      dispatch(getBoardsThunk({ token: CURRENT_TOKEN }));
    };

    getBoardsWithSighUp();
  }, [dispatch]);

  const handleClickCreateButton = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

    dispatch(createBoardThunk({ token: CURRENT_TOKEN, body: BODY }));
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
