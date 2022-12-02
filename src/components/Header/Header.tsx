import { Button, Typography } from '@mui/material';
import { LOCAL_STORAGE_KEY } from '../../constants/constants';
import { removeLocal } from 'helpers';
import { MouseEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { AUTHENTICATION_PATH, BOARDS_PATH, EDIT_PATH, ROOT_PATH } from 'router/constants';
import { authSlice } from 'store/authSlice';
import { INITIAL_AUTH_STATE } from 'store/constants';
import { AppDispatch, IRootState } from 'store/model';
import { typeSubPage } from 'types/types';
import { useTranslation } from 'react-i18next';
import styles from './Header.module.scss';
import { BasicModal } from 'components/Modal/BasicModal';
import { FormBoard } from 'components/FormBoard/FormBoard';

export type LangsType = {
  en: {
    nativeName: string;
  };
  ru: {
    nativeName: string;
  };
};

const lngs: LangsType = {
  en: { nativeName: 'English' },
  ru: { nativeName: 'Русский' },
};

const Header = () => {
  const { t, i18n } = useTranslation();

  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleClickOpenModal = () => {
    setOpenModal(true);
  };

  const [scroll, setScroll] = useState(false);

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
              <div className={styles['logo-text']}>{t('header.appName')}</div>
            </NavLink>
          </div>
          <nav className={styles.navigation}>
            {id ? (
              <>
                <NavLink to={BOARDS_PATH} className={styles.navigation__item}>
                  {t('header.linkBoards')}
                </NavLink>
                <div className={styles.navigation__item} onClick={handleClickOpenModal}>
                  {t('boards.formBoardCreate')}
                </div>
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

            <div>
              {Object.keys(lngs).map((lng) => (
                <Button
                  key={lng}
                  type="submit"
                  variant="outlined"
                  color="substitute"
                  size="small"
                  onClick={() => i18n.changeLanguage(lng)}
                >
                  <Typography
                    component="p"
                    fontWeight={i18n.resolvedLanguage === lng ? 'bold' : 'normal'}
                  >
                    {lngs[lng as keyof LangsType].nativeName}
                  </Typography>
                </Button>
              ))}
            </div>
          </nav>
        </div>

        <BasicModal
          title={t('boards.formBoardCreate')}
          openModal={openModal}
          setOpenModal={setOpenModal}
        >
          <FormBoard openModal={openModal} setOpenModal={setOpenModal} />
        </BasicModal>
      </header>
    </>
  );
};

export default Header;
