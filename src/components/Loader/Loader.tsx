import { Backdrop } from '@mui/material';
import { useTranslation } from 'react-i18next';
import styles from './Loader.module.scss';

const Loader = () => {
  const { t } = useTranslation();
  return (
    <Backdrop sx={{ color: '#fff' }} open={true}>
      <div className={styles['loader-wrapper']}>
        <div className={styles['loader']}></div>
        <p>{t('boards.loading')}</p>
        <div className={[styles['loader-section'], styles['section-left']].join(' ')}></div>
        <div className={[styles['loader-section'], styles['section-right']].join(' ')}></div>
      </div>
    </Backdrop>
  );
};
export default Loader;
