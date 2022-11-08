import { TextInner } from './Constants';
import cls from './Column.module.scss';

const Column = (): JSX.Element => {
  return (
    <div className={cls.column}>
      <h3>{TextInner.title}</h3>
    </div>
  );
};

export default Column;
