import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
  const [scroll, setScroll] = useState(false);

  const changeHeaderStyles = () => {
    console.log(window.scrollY);
    if (window.scrollY > 100) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', changeHeaderStyles);
  }, []);

  return (
    <header className={scroll ? styles['header-scroll'] : styles.header}>
      <div className={styles.header__container}>
        <div className={styles['logo-box']}>
          <NavLink to="/" end>
            <div className={styles['logo-text']}>Teamwork</div>
          </NavLink>
        </div>
        <nav className={styles.navigation}>
          <NavLink to="/boards" className={styles.navigation__item}>
            Boards
          </NavLink>
          <p className={styles.navigation__item}>Edit profile</p>
          <p className={styles.navigation__item}>Sign Out</p>
          <p className={styles.navigation__item}>Eng</p>
        </nav>
      </div>
    </header>
  );
};

export default Header;
