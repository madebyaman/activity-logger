import Link from 'next/link';
import { NextPage } from 'next/types';
import { CenteredLayout } from '../components/ui';
import { AuthForm } from '../components/AuthForm';
import Head from 'next/head';

const Signup: NextPage = () => {
  return (
    <CenteredLayout>
      <Head>
        <title>Signup</title>
      </Head>
      <div>
        <h1 className="mt-6 text-center heading1">Create a new account</h1>
        <p className="mt-2 text-center paragraph">
          Or{' '}
          <Link href={'/signin'}>
            <a className="link">sign in to your account</a>
          </Link>
        </p>
      </div>
      <AuthForm mode="signup" />
    </CenteredLayout>
  );
};

export default Signup;
