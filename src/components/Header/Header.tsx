import CancelIcon from '@mui/icons-material/Cancel';
import MenuIcon from '@mui/icons-material/Menu';
import {
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  List,
  styled,
  Switch,
  Typography,
} from '@mui/material';
import { FormBoard } from 'components/FormBoard/FormBoard';
import { BasicModal } from 'components/Modal/BasicModal';
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
import { ReactComponent as EngSvg } from './assets/en.svg';
import { ReactComponent as RuSvg } from './assets/ru.svg';
import styles from './Header.module.scss';

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

  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleClickOpenModal = () => {
    setOpenModal(true);
  };

  const [scroll, setScroll] = useState(false);
  const [lang, setLang] = useState<Lang>(InitialLanguage);
  const [mobileOpen, setMobileOpen] = useState(false);

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

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
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

  const linksForAuthUser = (
    <>
      <Button
        onClick={handleClickOpenModal}
        sx={{
          padding: 0,
          color: 'inherit',
          fontSize: 'inherit',
          fontWeight: 'inherit',
          letterSpacing: 0,
        }}
      >
        {t('boards.formBoardCreate')}
      </Button>
      <NavLink to={BOARDS_PATH} className={styles.navigation__item}>
        {t('header.linkBoards')}
      </NavLink>
      <NavLink to={EDIT_PATH} className={styles.navigation__item}>
        {t('header.linkProfile')}
      </NavLink>
      <Button
        onClick={outLogin}
        sx={{
          padding: 'inherit',
          color: 'inherit',
          fontSize: 'inherit',
          fontWeight: 'inherit',
          letterSpacing: 0,
        }}
      >
        {t('header.sighOut')}
      </Button>
    </>
  );

  const linksForUserWithoutAuth = (
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
  );

  return (
    <>
      <header className={scroll ? styles['header-scroll'] : styles.header}>
        <Container
          sx={{
            p: { mobile: 1, tablet: 2 },
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box
            className={styles['logo-box']}
            sx={{
              height: { mobile: 60, tablet: 83 },
              width: { mobile: 150, tablet: 208 },
            }}
          >
            <NavLink to={ROOT_PATH} className={styles.navigation__item} end>
              <Typography
                sx={{
                  fontWeight: 700,
                  letterSpacing: 2,
                  color: 'blond.main',
                  textTransform: 'uppercase',
                }}
              >
                {t('header.appName')}
              </Typography>
            </NavLink>
          </Box>
          <Box className={styles.navigation}>
            <List
              sx={{
                display: { mobile: 'none', tablet: 'flex' },
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 3.5,
              }}
            >
              {id ? linksForAuthUser : linksForUserWithoutAuth}
            </List>

            <Box component="nav">
              <Drawer
                anchor="right"
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                transitionDuration={500}
                ModalProps={{
                  keepMounted: true,
                }}
                sx={{
                  display: { mobile: 'flex', tablet: 'none' },
                  '& .MuiDrawer-paper': {
                    width: '80%',
                    backgroundColor: 'blond.main',
                  },
                }}
              >
                <Box
                  onClick={handleDrawerToggle}
                  sx={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    fontSize: 30,
                    cursor: 'pointer',
                    py: 4,
                    '&  *': {
                      width: '100%',
                      py: 4,
                      textAlign: 'center',
                    },
                    '&  *:hover': {
                      backgroundColor: '#c8c8c535',
                    },
                  }}
                >
                  <IconButton
                    aria-label="cancel icon"
                    sx={{
                      position: 'absolute',
                      top: 10,
                      right: 10,
                      width: 20,
                      height: 20,
                    }}
                  >
                    <CancelIcon sx={{ padding: 0 }} />
                  </IconButton>
                  {id ? linksForAuthUser : linksForUserWithoutAuth}
                </Box>
              </Drawer>
            </Box>

            <MaterialUISwitch
              icon={<EngSvg />}
              checkedIcon={<RuSvg />}
              onChange={changeLang}
              checked={lang === Lang.ru}
            />

            <IconButton
              size="large"
              color="substitute"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ p: { mobile: 1, tablet: 2 }, display: { tablet: 'none' } }}
            >
              <MenuIcon fontSize="large" />
            </IconButton>
          </Box>

          <BasicModal
            title={t('boards.formBoardCreate')}
            openModal={openModal}
            setOpenModal={setOpenModal}
          >
            <FormBoard openModal={openModal} setOpenModal={setOpenModal} />
          </BasicModal>
        </Container>
      </header>
    </>
  );
};

export default Header;
