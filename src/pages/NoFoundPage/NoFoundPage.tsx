import { PageText } from '../Pages.constants';
import styles from './NoFoundPage.module.css';
import NotFoundImage from './not-found-404-1-rust.svg';

const NoFoundPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.text}>{PageText.noFoundPage}</div>
        <img className={styles.image} src={NotFoundImage} alt="No Found" />
      </div>
    </div>
  );
};

export default NoFoundPage;
