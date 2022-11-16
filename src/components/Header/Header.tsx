import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
  // const [scroll, setScroll] = useState(false);

  // window.addEventListener('scroll', function () {
  //   if (window.pageXOffset > 0) {
  //     setScroll(true);
  //   }
  // });

  return (
    // <header className={!scroll ? styles.header : styles['header-scroll']}>
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
