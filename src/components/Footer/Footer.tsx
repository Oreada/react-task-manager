import styles from './Footer.module.css';
import LogoRSS from './rs_school_js.svg';
import GitHubLogo from './git-hub-logo.svg';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <div className={styles.footer__box}>
          <div className={styles.footer__repos}>
            <p className={styles.footer__git}>
              <a
                className={styles.footer__link}
                href="https://github.com/KateBlazhko"
                target="_blank"
                rel="noreferrer"
              >
                <img src={GitHubLogo} alt="Logo GitHub" width="30px" />
                <span className={styles.footer__name}>Katya</span>
              </a>
            </p>

            <p className={styles.footer__git}>
              <a
                className={styles.footer__link}
                href="https://github.com/ps0m"
                target="_blank"
                rel="noreferrer"
              >
                <img src={GitHubLogo} alt="Logo GitHub" width="30px" />
                <span className={styles.footer__name}>Sergey</span>
              </a>
            </p>

            <p className={styles.footer__git}>
              <a
                className={styles.footer__link}
                href="https://github.com/Oreada"
                target="_blank"
                rel="noreferrer"
              >
                <img src={GitHubLogo} alt="Logo GitHub" width="30px" />
                <span className={styles.footer__name}>Olya</span>
              </a>
            </p>
          </div>

          <p className={styles.footer__adds}>
            <p className={styles.footer__rss}>
              <a
                className={styles.footer__link}
                href="https://rs.school/react"
                target="_blank"
                rel="noreferrer"
              >
                <img src={LogoRSS} alt="Logo RSSchool" width="80px" />
              </a>
            </p>

            <p className={styles.footer__year}>&apos;22</p>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
