import Link from 'next/link';
import { NextPage } from 'next';
import { CenteredLayout } from '@/components/ui';
import Head from 'next/head';
import { FormEvent, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { FlashMessageContext } from '@/components/FlashMessage';
import axios from 'axios';

const ForgotPassword: NextPage = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { setFlashMessages } = useContext(FlashMessageContext);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post('/api/forgot-password/send-email', {
        email,
      });
      setFlashMessages &&
        setFlashMessages((prevMessages) => [
          ...prevMessages,
          {
            title: 'Success',
            message: 'Check your email to update the password',
            type: 'success',
          },
        ]);
      setTimeout(() => {
        router.push('/signin');
      }, 3000);
    } catch (e) {
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
  }

  return (
    <CenteredLayout>
      <Head>
        <title>Forgot Password</title>
      </Head>
      <div className="">
        <h1 className="mt-6 text-center heading1">Forgot Password</h1>
        <p className="mt-2 md:mt-4 text-base text-center paragraph">
          <Link href="/signin" className="link">
            Go back to login page
          </Link>
        </p>
      </div>
      <div className="max-w-sm my-0 mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mt-4 gap-2">
            <label className="sr-only" htmlFor="emailInput">
              Email address
            </label>
            <input
              type="email"
              name="email"
              id="emailInput"
              className={
                'input placeholder-gray-500 text-gray-900 sm:text-sm bg-gray-100 shadow-none my-1'
              }
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="submit"
              className={`w-full btn ${
                isLoading ? ' opacity-40 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </CenteredLayout>
  );
};

export default ForgotPassword;
