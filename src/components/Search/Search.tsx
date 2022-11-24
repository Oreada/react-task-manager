import { ChangeEvent, KeyboardEvent, useState } from 'react';
import classes from './Search.module.scss';
import { INPUT_PLACEHOLDER, INPUT_TYPE, KEY_CODE } from './Search.constants';
import { useNavigate } from 'react-router-dom';
import { SEARCH_PATH } from 'router/constants';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { IRootState } from 'store/model';
import { setSearchValue } from 'store/boardSlice';

const Search = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState<string>('');
  const dispatch = useDispatch();

  const handlerChange = (e: ChangeEvent<HTMLInputElement>): void => setValue(e.target.value);

  const searchPhoto = (e: KeyboardEvent): void => {
    if (e.code === KEY_CODE) {
      dispatch(setSearchValue({ searchValue: value }));
      navigate(SEARCH_PATH);
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
        placeholder={INPUT_PLACEHOLDER}
        autoFocus
      />
    </div>
  );
};

export default Search;
