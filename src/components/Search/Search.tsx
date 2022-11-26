import { ChangeEvent, KeyboardEvent, useState } from 'react';
import classes from './Search.module.scss';
import { INPUT_TYPE, KEY_CODE } from './Search.constants';
import { useNavigate } from 'react-router-dom';
import { SEARCH_PATH } from 'router/constants';
import { useDispatch } from 'react-redux';
import { setSearchValue } from 'store/boardSlice';
import { useSelector } from 'react-redux';
import { IRootState } from 'store/model';
import { useTranslation } from 'react-i18next';

const Search = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [value, setValue] = useState<string>('');

  const dispatch = useDispatch();
  const { token } = useSelector((state: IRootState) => state.auth);

  const handlerChange = (e: ChangeEvent<HTMLInputElement>): void => setValue(e.target.value);

  const searchPhoto = async (e: KeyboardEvent): Promise<void> => {
    if (e.code === KEY_CODE) {
      if (value) {
        dispatch(setSearchValue({ searchValue: value }));
        navigate(SEARCH_PATH);
      }
    }
  };

  return (
    <div className={classes.searchWrap}>
      <input
        className={classes.search}
        type={INPUT_TYPE}
        onChange={handlerChange}
        onKeyPress={searchPhoto}
        value={value}
        placeholder={t('boards.searchTasks')}
        autoFocus
      />
    </div>
  );
};

export default Search;
