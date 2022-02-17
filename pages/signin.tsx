import Link from 'next/link';
import AuthForm from '../components/AuthForm';
import { NextPage } from 'next';

const Signin: NextPage = () => {
  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link href="/signup">
              <a className="font-medium text-indigo-600 hover:text-indigo-500">
                create a new account
              </a>
            </Link>
          </p>
        </div>
        <AuthForm mode="signin" />
      </div>
    </div>
  );
};

export default Signin;
