import Link from 'next/link';
import { XMarkIcon } from '@heroicons/react/24/outline';

export function VerifyEmailBanner({ verified }: { verified: boolean }) {
  if (verified) {
    return null;
  }
  return (
    <div className="relative bg-red-600">
      <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
        <div className="pr-16 sm:text-center sm:px-16">
          <p className="font-medium text-white">
            <span className="md:hidden">You need to verify your email.</span>
            <span className="hidden md:inline">
              Psst! To use full application features, you need to verify your
              email.
            </span>
            <span className="block sm:ml-2 sm:inline-block">
              <Link
                href="/verify-email"
                className="text-white font-bold underline"
              >
                {' '}
                Resend verification email <span aria-hidden="true">&rarr;</span>
              </Link>
            </span>
          </p>
        </div>
        <div className="absolute inset-y-0 right-0 pt-1 pr-1 flex items-start sm:pt-1 sm:pr-2 sm:items-start">
          <button
            type="button"
            className="flex p-2 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-white"
          >
            <span className="sr-only">Dismiss</span>
            <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
