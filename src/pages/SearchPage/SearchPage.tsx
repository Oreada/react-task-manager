import { getTasksBySearching } from 'api/tasks/getTasksBySearching';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IRootState } from 'store/model';
import { TaskType } from 'types/types';

const SearchPage = () => {
  const [searchData, setSearchData] = useState<TaskType[] | null>(null);
  const { searchValue } = useSelector((state: IRootState) => state.board);
  const { token } = useSelector((state: IRootState) => state.auth);

  useEffect(() => {
    if (token) {
      const getSearchData = async () => {
        console.log(searchValue);

        const data = await getTasksBySearching(token, searchValue);
        console.log(data);

        setSearchData(data);
      };

      getSearchData();
    }
  }, [searchValue, token]);

  return (
    <div>
      {searchData && searchData.length ? (
        searchData.map((item) => <div key={item._id}>{item.title}</div>)
      ) : (
        <span>There is nothing</span>
      )}
    </div>
  );
};

export default SearchPage;
