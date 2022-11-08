import Column from 'components/Column/Column';
import cls from './Board.module.scss';

const Board = (): JSX.Element => {
  return (
    <div className={cls.list}>
      <Column />
      <Column />
      <Column />
      <Column />
    </div>
  );
};

export default Board;
