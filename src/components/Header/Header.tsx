import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <div className={styles['logo-box']}>
          {/* <div className={styles['logo-text']}>Teamwork</div> */}
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
