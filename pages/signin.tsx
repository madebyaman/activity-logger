import Link from 'next/link';
import { NextPage } from 'next';
import { CenteredLayout } from '../components/ui';
import { AuthForm } from '../components/AuthForm';
import Head from 'next/head';

const Signin: NextPage = () => {
  return (
    <CenteredLayout>
      <Head>
        <title>Signin</title>
      </Head>
      <div>
        <h1 className="mt-6 text-center heading1">Sign in to your account</h1>
        <p className="mt-2 md:mt-4 text-center paragraph">
          Or{' '}
          <Link href="/signup">
            <a className="link">create a new account</a>
          </Link>
        </p>
      </div>
      <AuthForm mode="signin" />
    </CenteredLayout>
  );
};

export default Signin;
