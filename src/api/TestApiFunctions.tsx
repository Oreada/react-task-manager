import { useState } from 'react';
import { UserInfo } from 'types/types';
import { getAllUsers } from './users/getAllUsers';
import { deleteUser } from './users/deleteUser';

// 636b5a6b83f1e2fe95e7a283
export const firstUser = {
  name: 'FirstUser',
  login: 'FirstUser',
  password: 'FirstUser',
};

// 636b7dd719d35b6ca446c3cd
export const secondUser = {
  name: 'SecondUser',
  login: 'SecondUser',
  password: 'SecondUser',
};

// 636ba2d019d35b6ca446c404
export const thirdUser = {
  login: 'ThirdUser',
  password: 'ThirdUser',
};

export function TestApiFunctions() {
  const [result, setResult] = useState<UserInfo | unknown>({});
  const [error, setError] = useState<string>('');

  const clickHandler = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

    try {
      // const result = await getAllUsers(
      //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNmJhMmQwMTlkMzViNmNhNDQ2YzQwNCIsImxvZ2luIjoiVGhpcmRVc2VyIiwiaWF0IjoxNjY4MDY5NTk1LCJleHAiOjE2NjgxMTI3OTV9.rChnyK0_5zvXhQZyRBQGrjNAVHQiTjZJ3x4WtTwczX8'
      // );
      const result = await deleteUser(
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNmJhMmQwMTlkMzViNmNhNDQ2YzQwNCIsImxvZ2luIjoiVGhpcmRVc2VyIiwiaWF0IjoxNjY4MDY5NTk1LCJleHAiOjE2NjgxMTI3OTV9.rChnyK0_5zvXhQZyRBQGrjNAVHQiTjZJ3x4WtTwczX8',
        '636b7dd719d35b6ca446c3cd'
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
