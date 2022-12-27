import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, FormEvent, useContext, useState } from 'react';

import { FlashMessageContext } from './FlashMessage';

type AuthFormProps =
  | {
      mode: 'SIGNIN';
      onSignin: ({
        email,
        password,
      }: {
        email: string;
        password: string;
      }) => Promise<void>;
    }
  | {
      mode: 'SIGNUP';
      onSignup: ({
        firstName,
        lastName,
        email,
        password,
      }: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
      }) => Promise<void>;
    };

export function AuthForm(props: AuthFormProps) {
  const { mode } = props;
  const [email, setEmail] = useState(() => {
    if (mode === 'SIGNIN') return 'amanthakur95@gmail.com'
    else return ''
  });
  const [password, setPassword] = useState(() => {
    mode === 'SIGNIN' ? 'password' : ''
  });
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { setFlashMessages } = useContext(FlashMessageContext);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (mode === 'SIGNIN') {
        await props.onSignin({ email, password });
      } else {
        await props.onSignup({ firstName, lastName, email, password });
      }
      setFlashMessages &&
        setFlashMessages((prevMessages) => [
          ...prevMessages,
          {
            title: 'Success',
            message: `You have successfully ${
              mode === 'SIGNIN' ? 'logged in' : 'signed up'
            }`,
            type: 'success',
          },
        ]);
      router.push('/dashboard');
    } catch (err) {
      setFlashMessages &&
        setFlashMessages((prevMessages) => [
          ...prevMessages,
          {
            title: 'Error submitting form',
            message: 'Something went wrong while submitting your form.',
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
    <div className="max-w-sm my-0 mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col mt-4 gap-2">
          {mode === 'SIGNUP' && (
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
                className={'input' + additionalInputClasses}
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
                className={'input' + additionalInputClasses}
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
            className={'input' + additionalInputClasses}
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
            className={'input' + additionalInputClasses}
            placeholder="Password"
          />
        </div>

        <div className="mt-4">
          <button
            type="submit"
            className={`w-full btn ${
              isLoading ? ' opacity-40 cursor-not-allowed' : ''
            }`}
          >
            {isLoading
              ? 'Loading...'
              : mode === 'SIGNIN'
              ? 'Sign in'
              : 'Sign up'}
          </button>
        </div>
      </form>
      {mode === 'SIGNIN' && (
        <div className="mt-4">
          <p className="mt-2 md:mt-4 text-sm paragraph text-gray-800">
            Forgot password?{' '}
            <Link href="/forgot-password" className="link">
              Reset here
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}
