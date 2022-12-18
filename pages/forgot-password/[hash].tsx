import Link from 'next/link';
import { NextPage } from 'next';
import { CenteredLayout } from '@/components/ui';
import Head from 'next/head';
import { FormEvent, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { FlashMessageContext } from '@/components/FlashMessage';
import axios from 'axios';

const UpdatePassword: NextPage = () => {
  const [formState, setFormState] = useState<{
    loading: 'INIT' | 'LOADING' | 'LOADED';
    newPassword: string;
    confirmNewPassword: string;
  }>({ loading: 'INIT', newPassword: '', confirmNewPassword: '' });
  const router = useRouter();
  const { hash } = router.query;
  const { setFlashMessages } = useContext(FlashMessageContext);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormState({ ...formState, loading: 'LOADING' });
    if (formState.newPassword !== formState.confirmNewPassword || !hash) {
      setFlashMessages &&
        setFlashMessages((prevMessages) => [
          ...prevMessages,
          {
            title: "Password don't match",
            message: 'Confirm your password again',
            type: 'error',
          },
        ]);
      return;
    }
    try {
      await axios.put('/api/forgot-password/update-password', {
        password: formState.newPassword,
        verificationString: hash,
      });
      setFlashMessages &&
        setFlashMessages((prevMessages) => [
          ...prevMessages,
          {
            title: 'Success',
            message: 'Successfully updated your password. You can now login',
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
      setFormState({ ...formState, loading: 'LOADED' });
    }
  }

  return (
    <CenteredLayout>
      <Head>
        <title>Update Password</title>
      </Head>
      <div className="">
        <h1 className="mt-6 text-center heading1">Update Password</h1>
        <p className="mt-2 md:mt-4 text-base text-center paragraph">
          <Link href="/signin" className="link">
            Go back to login page
          </Link>
        </p>
      </div>
      <div className="max-w-sm my-0 mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mt-4 gap-2">
            <label className="sr-only" htmlFor="newPassword">
              Enter your new password
            </label>
            <input
              type="password"
              id="newPassword"
              className={
                'input placeholder-gray-500 text-gray-900 sm:text-sm bg-gray-100 shadow-none my-1'
              }
              value={formState.newPassword}
              placeholder="New password"
              onChange={(e) =>
                setFormState({ ...formState, newPassword: e.target.value })
              }
            />
            <label className="sr-only" htmlFor="confirmNewPassword">
              Confirm your new password
            </label>
            <input
              type="password"
              id="confirmNewPassword"
              className={
                'input placeholder-gray-500 text-gray-900 sm:text-sm bg-gray-100 shadow-none my-1'
              }
              value={formState.confirmNewPassword}
              placeholder="Confirm new password"
              onChange={(e) =>
                setFormState({
                  ...formState,
                  confirmNewPassword: e.target.value,
                })
              }
            />
            <button
              type="submit"
              className={`w-full btn ${
                formState.loading === 'LOADING'
                  ? ' opacity-40 cursor-not-allowed'
                  : ''
              }`}
            >
              {formState.loading === 'LOADING' ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </CenteredLayout>
  );
};

export default UpdatePassword;
