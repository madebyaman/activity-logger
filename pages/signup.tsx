import Link from 'next/link';
import { NextPage } from 'next/types';
import { CenteredLayout } from '../components/ui';
import { AuthForm } from '../components/AuthForm';
import Head from 'next/head';
import axios from 'axios';

const Signup: NextPage = () => {
  async function onSignup(props: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }): Promise<void> {
    await axios.post('/api/signup', props);
  }

  return (
    <CenteredLayout>
      <Head>
        <title>Signup</title>
      </Head>
      <div>
        <h1 className="mt-6 text-center heading1">Create a new account</h1>
        <p className="mt-2 text-center paragraph">
          Or{' '}
          <Link href={'/signin'} className="link">
            sign in to your account
          </Link>
        </p>
      </div>
      <AuthForm mode="SIGNUP" onSignup={onSignup} />
    </CenteredLayout>
  );
};

export default Signup;
