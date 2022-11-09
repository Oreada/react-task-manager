import { useState } from 'react';
import { SignUpResult } from 'types/types';
import { signUp } from './signUp';

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
  name: 'ThirdUser',
  login: 'ThirdUser',
  password: 'ThirdUser',
};

export function TestApiFunctions() {
  const [resultSignUp, setResultSignUp] = useState<SignUpResult>({ _id: '', name: '', login: '' });
  const [errorSignUp, setErrorSignUp] = useState<string>('');

  const clickHandler = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

    try {
      const result = await signUp(thirdUser);
      console.log('my result is', result);
      setResultSignUp(result);
    } catch (e: unknown) {
      const err = e as Error;
      console.log('my error is', err.message);
      setErrorSignUp(err.message);
    }
  };

  return (
    <div>
      <p>Name: {resultSignUp.name}</p>
      <p>ID: {resultSignUp._id}</p>
      <button onClick={clickHandler}>Click here</button>
      {errorSignUp && <p>{errorSignUp}</p>}
    </div>
  );
}
