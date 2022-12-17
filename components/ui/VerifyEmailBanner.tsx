import { XMarkIcon } from '@heroicons/react/24/outline';
import { useState, MouseEvent } from 'react';
import axios from 'axios';
import { classNames } from 'utils';

function getMessage(
  status: 'INIT' | 'LOADING' | 'ERROR' | 'SUCCESS'
): [string, string] {
  if (status === 'INIT' || status === 'LOADING') {
    return [
      'You need to verify your email',
      'Psst! To use full application features, you need to verify your email.',
    ];
  } else if (status === 'ERROR') {
    return [
      'Failed to send email',
      'Ah! We were unable to send the email. Try giving the browser a refresh.',
    ];
  } else {
    return [
      'Email sent successfully',
      'We sent the email. Now go to your email inbox and click on verification link.',
    ];
  }
}

export function VerifyEmailBanner({ verified }: { verified: boolean }) {
  const [status, setStatus] = useState<
    'INIT' | 'LOADING' | 'SUCCESS' | 'ERROR'
  >('INIT');

  const resetPassword = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setStatus('LOADING');
    try {
      await axios.get('/api/verify-email/send-email');
      setStatus('SUCCESS');
    } catch (e) {
      setStatus('ERROR');
    }
  };

  if (verified) {
    return null;
  }

  return (
    <div className="relative bg-red-600">
      <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
        <div className="pr-16 sm:text-center sm:px-16">
          <p className="font-medium text-white">
            <span className="md:hidden">{getMessage(status)[0]}</span>
            <span className="hidden md:inline">{getMessage(status)[1]}</span>
            {(status === 'INIT' || status === 'LOADING') && (
              <span className="block sm:ml-2 sm:inline-block">
                <button
                  onClick={resetPassword}
                  className={classNames(
                    'text-white font-bold underline decoration-red-200 underline-offset-2',
                    status === 'LOADING'
                      ? 'cursor-not-allowed opacity-50'
                      : 'hover:decoration-white'
                  )}
                  disabled={status === 'LOADING' ? true : false}
                  aria-disabled={status === 'LOADING' ? true : false}
                >
                  {status === 'LOADING'
                    ? 'Sending email'
                    : ' Resend verification email '}
                  {status === 'INIT' && <span aria-hidden="true">&rarr;</span>}
                </button>
              </span>
            )}
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
