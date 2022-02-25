import Link from 'next/link';
import { NextPage } from 'next';
import { CenteredLayout, linkClasses } from '../components/ui';
import { AuthForm } from '../components/AuthForm';

const Signin: NextPage = () => {
  return (
    <CenteredLayout>
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <Link href="/signup">
            <a className={linkClasses}>create a new account</a>
          </Link>
        </p>
      </div>
      <AuthForm mode="signin" />
    </CenteredLayout>
  );
};

export default Signin;
