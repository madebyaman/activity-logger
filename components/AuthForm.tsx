import { useRouter } from 'next/router';
import { FC, FormEvent, useContext, useState } from 'react';

import { AuthSigninProps, AuthSignupProps } from '../types';
import { auth } from '../utils/auth';
import { FlashMessageContext } from './FlashMessage';
import {
  defaultButtonClasses,
  disabledButtonClasses,
  inputClasses,
} from './ui';

export const AuthForm: FC<{ mode: 'signin' | 'signup' }> = ({
  mode = 'signin',
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { setFlashMessages } = useContext(FlashMessageContext);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const signInUserData: AuthSigninProps = {
      mode: 'signin',
      body: {
        email,
        password,
      },
    };

    const signUpUserData: AuthSignupProps = {
      mode: 'signup',
      body: {
        email,
        password,
        firstName,
        lastName,
      },
    };

    try {
      await auth(mode === 'signin' ? signInUserData : signUpUserData);
      setFlashMessages &&
        setFlashMessages((prevMessages) => [
          ...prevMessages,
          {
            title: 'Success',
            message: `You have successfully ${
              mode === 'signin' ? 'logged in' : 'signed up'
            }`,
            type: 'success',
          },
        ]);
      router.push('/');
    } catch (err) {
      setFlashMessages &&
        setFlashMessages((prevMessages) => [
          ...prevMessages,
          {
            title: 'Error submitting form',
            message:
              'Something went wrong while submitting your form. Refresh the page and try again.',
            type: 'error',
          },
        ]);
    } finally {
      setIsLoading(false);
    }
  };

  const additionalInputClasses =
    ' placeholder-gray-500 text-gray-900 sm:text-sm bg-gray-100 shadow-none my-1';

  return (
    <div className="max-w-sm">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="flex flex-col mt-4">
          {mode === 'signup' && (
            <>
              <label className="sr-only" htmlFor="firstName">
                First name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className={inputClasses + additionalInputClasses}
                placeholder="First name"
                required
              />
              <label className={'sr-only'} htmlFor="lastName">
                Last name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className={inputClasses + additionalInputClasses}
                placeholder="Last name"
                required
              />
            </>
          )}
          <label htmlFor="email-address" className={'sr-only'}>
            Email address
          </label>
          <input
            id="email-address"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            autoComplete="email"
            required
            className={inputClasses + additionalInputClasses}
            placeholder="Email address"
          />
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className={inputClasses + additionalInputClasses}
            placeholder="Password"
          />
        </div>

        <div className="mt-2">
          <button
            type="submit"
            className={`w-full ${
              isLoading ? disabledButtonClasses : defaultButtonClasses
            }`}
          >
            {isLoading
              ? 'Loading...'
              : mode === 'signin'
              ? 'Sign in'
              : 'Sign up'}
          </button>
        </div>
      </form>
    </div>
  );
};
