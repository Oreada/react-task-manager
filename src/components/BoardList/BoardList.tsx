import { PageText } from '../../pages/Pages.constants';
import cls from './BoardList.module.scss';

const BoardList = (): JSX.Element => {
  return <div className={cls.list}>{PageText.aboutPage}</div>;
};

export default BoardList;
