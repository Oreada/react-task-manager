import { Backdrop } from '@mui/material';
import styles from './Loader.module.scss';

const Loader = () => {
  return (
    <Backdrop sx={{ backgroundColor: 'rgba(0, 0, 0, 0)', zIndex: 9 }} open={true}>
      <div className={styles['loader-wrapper']}>
        <div className={styles['loader']}></div>
        <div className={[styles['loader-section'], styles['section-left']].join(' ')}></div>
        <div className={[styles['loader-section'], styles['section-right']].join(' ')}></div>
      </div>
    </Backdrop>
  );
};
export default Loader;
