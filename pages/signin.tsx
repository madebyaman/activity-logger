import Link from 'next/link';
import { NextPage } from 'next';
import { CenteredLayout } from '@/components/ui';
import { AuthForm } from '@/components/AuthForm';
import Head from 'next/head';
import axios from 'axios';

const Signin: NextPage = () => {
  const handleSignin = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    await axios.post('/api/signin', {
      email,
      password,
    });
  };

  return (
    <CenteredLayout>
      <Head>
        <title>Signin</title>
      </Head>
      <div>
        <h1 className="mt-6 text-center heading1">Sign in to your account</h1>
        <p className="mt-2 md:mt-4 text-center text-base text-gray-800 paragraph">
          Or{' '}
          <Link href="/signup" className="link">
            create a new account
          </Link>
        </p>
      </div>
      <AuthForm mode="SIGNIN" onSignin={handleSignin} />
    </CenteredLayout>
  );
};

export default Signin;
