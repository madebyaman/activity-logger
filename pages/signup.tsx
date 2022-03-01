import Link from 'next/link';
import { NextPage } from 'next/types';
import { CenteredLayout, linkClasses } from '../components/ui';
import { AuthForm } from '../components/AuthForm';
import Head from 'next/head';

const Signup: NextPage = () => {
  return (
    <CenteredLayout>
      <Head>
        <title>Signup</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create a new account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <Link href={'/signin'}>
            <a className={linkClasses}>sign in to your account</a>
          </Link>
        </p>
      </div>
      <AuthForm mode="signup" />
    </CenteredLayout>
  );
};

export default Signup;
