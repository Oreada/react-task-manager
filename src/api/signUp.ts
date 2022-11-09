import { BASE_API } from 'constants/constants';
import { BodyForSignUp, SignUpResult, SignUpError } from 'types/types';

//! Create new User
export async function signUp(obj: BodyForSignUp): Promise<SignUpResult> {
  try {
    const response = await fetch(`${BASE_API}/auth/signup`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj),
    });

    if (!response.ok) {
      if (response.status === 400 || response.status === 409) {
        const myError = (await response.json()) as SignUpError;
        throw new Error(
          JSON.stringify({
            statusCode: myError.statusCode,
            message: myError.message,
          })
        );
      }

      throw new Error(`Request failed with status code ${response.status}`);
    }

    const newUser = (await response.json()) as SignUpResult;
    console.log('created user =', newUser);
    return {
      _id: newUser._id,
      name: newUser.name,
      login: newUser.login,
    };
  } catch (e: unknown) {
    const err = e as Error;
    console.log('Catched error =', err.message);
    throw new Error(err.message);
  }
}
