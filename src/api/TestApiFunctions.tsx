import { useState } from 'react';
// import { SignUpResult } from 'types/types';
import { signIn } from './auth/signIn';

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
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string>('');

  const clickHandler = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

    try {
      const result = await signIn(thirdUser);
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
      <p>Result: {result}</p>
      <button onClick={clickHandler}>Click here</button>
      {error && <p>{error}</p>}
    </div>
  );
}
