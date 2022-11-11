import { useState } from 'react';
import { Board, Column, Task } from 'types/types';
import { getAllBoards } from './boards/getAllBoards';
import { getAllColumnsOfBoard } from './columns/getAllColumnsOfBoard';
import { getAllTasksOfColumn } from './tasks/getAllTasksOfColumn';
import { updateTask } from './tasks/updateTask';
import { getTasksByIdUser } from './tasks/getTasksByIdUser';

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

// boards ids: 636cee7f4f5723389cfea000, 636cef214f5723389cfea002, 636cef524f5723389cfea004

export function TestApiFunctions() {
  const [result, setResult] = useState<Array<Task>>([]);
  const [error, setError] = useState<string>('');

  const clickHandler = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

    try {
      // const result = await getAllUsers(
      //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNmI1YTZiODNmMWUyZmU5NWU3YTI4MyIsImxvZ2luIjoiRmlyc3RVc2VyIiwiaWF0IjoxNjY4MTU3OTM0LCJleHAiOjE2NjgyMDExMzR9.mUOcMs0honwvkLem6NVPY9n3hera1wSuBqAyKoNefQg'
      // );

      // const result = await getAllBoards(
      //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNmI1YTZiODNmMWUyZmU5NWU3YTI4MyIsImxvZ2luIjoiRmlyc3RVc2VyIiwiaWF0IjoxNjY4MTU3OTM0LCJleHAiOjE2NjgyMDExMzR9.mUOcMs0honwvkLem6NVPY9n3hera1wSuBqAyKoNefQg'
      // );

      // const result = await getAllColumnsOfBoard(
      //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNmI1YTZiODNmMWUyZmU5NWU3YTI4MyIsImxvZ2luIjoiRmlyc3RVc2VyIiwiaWF0IjoxNjY4MTU3OTM0LCJleHAiOjE2NjgyMDExMzR9.mUOcMs0honwvkLem6NVPY9n3hera1wSuBqAyKoNefQg',
      //   '636cef524f5723389cfea004'
      // );

      // const result = await getAllTasksOfColumn(
      //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNmI1YTZiODNmMWUyZmU5NWU3YTI4MyIsImxvZ2luIjoiRmlyc3RVc2VyIiwiaWF0IjoxNjY4MTU3OTM0LCJleHAiOjE2NjgyMDExMzR9.mUOcMs0honwvkLem6NVPY9n3hera1wSuBqAyKoNefQg',
      //   '636cef524f5723389cfea004',
      //   '636d55bcdcbc2ec1bc6f22a2'
      // );

      // const result = await updateTask(
      //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNmI1YTZiODNmMWUyZmU5NWU3YTI4MyIsImxvZ2luIjoiRmlyc3RVc2VyIiwiaWF0IjoxNjY4MTU3OTM0LCJleHAiOjE2NjgyMDExMzR9.mUOcMs0honwvkLem6NVPY9n3hera1wSuBqAyKoNefQg',
      //   '636cef524f5723389cfea004',
      //   '636d55bcdcbc2ec1bc6f22a2',
      //   '636e13a7231d5cb1866ab797',
      //   {
      //     title: 'Finish the report',
      //     order: 2,
      //     description: 'Deadline is 11.11.22',
      //     columnId: '636d55bcdcbc2ec1bc6f22a2',
      //     userId: '636ba2d019d35b6ca446c404',
      //     users: ['636b5a6b83f1e2fe95e7a283'],
      //   }
      // );

      const result = await getTasksByIdUser(
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNmI1YTZiODNmMWUyZmU5NWU3YTI4MyIsImxvZ2luIjoiRmlyc3RVc2VyIiwiaWF0IjoxNjY4MTU3OTM0LCJleHAiOjE2NjgyMDExMzR9.mUOcMs0honwvkLem6NVPY9n3hera1wSuBqAyKoNefQg',
        '636ba2d019d35b6ca446c404'
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
      {/* <p>Result: {(result as Column).title}</p> */}
      <button onClick={clickHandler}>Click here</button>
      {error && <p>{error}</p>}
    </div>
  );
}
