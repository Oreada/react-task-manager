import { Button } from '@mui/material';
import { LOCAL_STORAGE_KEY } from 'constants/constants';
import { removeLocal } from 'helpers';
import { MouseEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { AUTHENTICATION_PATH, BOARDS_PATH, ROOT_PATH } from 'router/constants';
import { authSlice } from 'store/authSlice';
import { INITIAL_AUTH_STATE } from 'store/constants';
import { AppDispatch, IRootState } from 'store/model';
import { typeSubPage } from 'types/types';
import styles from './Header.module.scss';

const Header = () => {
  const [scroll, setScroll] = useState(false);

  const { id } = useSelector((state: IRootState) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { setId } = authSlice.actions;

  const outLogin = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch(setId(INITIAL_AUTH_STATE));
    removeLocal(LOCAL_STORAGE_KEY);
    navigate('/');
  };

  const changeHeaderStyles = () => {
    if (window.scrollY > 100) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', changeHeaderStyles);
    return () => {
      window.removeEventListener('scroll', changeHeaderStyles);
    };
  }, []);

  return (
    <>
      <header className={scroll ? styles['header-scroll'] : styles.header}>
        <div className={styles.header__container}>
          <div className={styles['logo-box']}>
            <NavLink to={ROOT_PATH} end>
              <div className={styles['logo-text']}>Teamwork</div>
            </NavLink>
          </div>
          <nav className={styles.navigation}>
            {id ? (
              <>
                <NavLink to={BOARDS_PATH} className={styles.navigation__item}>
                  Boards
                </NavLink>
                <p className={styles.navigation__item}>Edit profile</p>
                <Button
                  onClick={outLogin}
                  sx={{
                    padding: 0,
                    color: '#000',
                    fontSize: 20,
                    fontWeight: 600,
                    textTransform: 'none',
                    letterSpacing: 0,
                    lineHeight: 'normal',
                    fontFamily: `"Noto Sans", sans- serif;"`,
                  }}
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <NavLink to={AUTHENTICATION_PATH} state={typeSubPage.signIn} className={styles.navigation__item}>
                  Sign In
                </NavLink>
                <NavLink to={AUTHENTICATION_PATH} state={typeSubPage.signUp} className={styles.navigation__item}>
                  Sign Up
                </NavLink>
              </>
            )}
            <p className={styles.navigation__item}>Eng</p>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
