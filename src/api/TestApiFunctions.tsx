import { useState } from 'react';
import { UserInfo } from 'types/types';
import { getAllUsers } from './users/getAllUsers';

export const firstUser = {
  name: 'FirstUser',
  login: 'FirstUser',
  password: 'FirstUser',
};

export const secondUser = {
  name: 'SecondUser',
  login: 'SecondUser',
  password: 'SecondUser',
};

export const thirdUser = {
  login: 'ThirdUser',
  password: 'ThirdUser',
};

export function TestApiFunctions() {
  const [result, setResult] = useState<Array<UserInfo>>([]);
  const [error, setError] = useState<string>('');

  const clickHandler = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

    try {
      const result = await getAllUsers(
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNmJhMmQwMTlkMzViNmNhNDQ2YzQwNCIsImxvZ2luIjoiVGhpcmRVc2VyIiwiaWF0IjoxNjY4MDY5NTk1LCJleHAiOjE2NjgxMTI3OTV9.rChnyK0_5zvXhQZyRBQGrjNAVHQiTjZJ3x4WtTwczX8'
      );
      console.log('my result is', result);
      setResult(result);
    } catch (e: unknown) {
      const err = e as Error;
      console.log('my error is', err.message);
      setError(err.message);
    }
  };

  return (
    <div>
      {/* <p>Result: {result}</p> */}
      <button onClick={clickHandler}>Click here</button>
      {error && <p>{error}</p>}
    </div>
  );
}
