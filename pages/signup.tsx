import Link from 'next/link';
import { NextPage } from 'next/types';
import AuthForm from '../components/AuthForm';

const Signup: NextPage = () => {
  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create a new account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link href={'/signin'}>
              <a className="font-medium text-indigo-600 hover:text-indigo-500">
                sign in to your account
              </a>
            </Link>
          </p>
        </div>

        <AuthForm mode="signup" />
      </div>
    </div>
  );
};

export default Signup;
