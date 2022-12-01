import { Box, Button, Container, styled, Switch, Typography } from '@mui/material';
import { LOCAL_STORAGE_KEY } from 'constants/constants';
import { removeLocal } from 'helpers';
import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { AUTHENTICATION_PATH, BOARDS_PATH, EDIT_PATH, ROOT_PATH } from 'router/constants';
import { authSlice } from 'store/authSlice';
import { INITIAL_AUTH_STATE } from 'store/constants';
import { AppDispatch, IRootState } from 'store/model';
import { typeSubPage } from 'types/types';
import { ReactComponent as EngSvg } from './en.svg';
import styles from './Header.module.scss';
import { ReactComponent as RuSvg } from './ru.svg';

export enum Lang {
  en = 'en',
  ru = 'ru',
}

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    '&.Mui-checked': {
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.colorful.main,
      },
    },
  },
  '& .MuiSwitch-thumb': {
    width: 30,
    height: 30,
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.colorful.main,
    borderRadius: 20 / 2,
  },
}));

const Header = () => {
  const { t, i18n } = useTranslation();
  const InitialLanguage = i18n.resolvedLanguage === Lang.en ? Lang.en : Lang.ru;

  const [scroll, setScroll] = useState(false);
  const [lang, setLang] = useState<Lang>(InitialLanguage);

  const { id } = useSelector((state: IRootState) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { setId, setUserData } = authSlice.actions;

  const outLogin = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch(setId(INITIAL_AUTH_STATE));
    dispatch(setUserData({ user: null }));
    removeLocal(LOCAL_STORAGE_KEY);
    navigate('/');
  };

  const changeLang = (event: ChangeEvent<HTMLInputElement>) => {
    setLang(event.target.checked ? Lang.ru : Lang.en);
    i18n.changeLanguage(event.target.checked ? Lang.ru : Lang.en);
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
        <Container
          sx={{
            p: 2.5,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2.75,
          }}
        >
          <Box className={styles['logo-box']}>
            <NavLink to={ROOT_PATH} end>
              <Typography
                sx={{
                  fontWeight: 600,
                  letterSpacing: 2,
                  color: 'blond.main',
                  textTransform: 'uppercase',
                }}
              >
                {t('header.appName')}
              </Typography>
            </NavLink>
          </Box>
          <nav className={styles.navigation}>
            {id ? (
              <>
                <NavLink to={BOARDS_PATH} className={styles.navigation__item}>
                  {t('header.linkBoards')}
                </NavLink>
                <NavLink to={EDIT_PATH} className={styles.navigation__item}>
                  {t('header.linkProfile')}
                </NavLink>
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
                  {t('header.sighOut')}
                </Button>
              </>
            ) : (
              <>
                <NavLink
                  to={AUTHENTICATION_PATH}
                  state={typeSubPage.signIn}
                  className={styles.navigation__item}
                >
                  {t('header.sighIn')}
                </NavLink>
                <NavLink
                  to={AUTHENTICATION_PATH}
                  state={typeSubPage.signUp}
                  className={styles.navigation__item}
                >
                  {t('header.sighUp')}
                </NavLink>
              </>
            )}

            <MaterialUISwitch
              icon={<EngSvg />}
              checkedIcon={<RuSvg />}
              onChange={changeLang}
              checked={lang === Lang.ru}
            />
          </nav>
        </Container>
      </header>
    </>
  );
};

export default Header;
