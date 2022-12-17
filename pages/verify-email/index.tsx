import axios from 'axios';
import { NextPage } from 'next';
import Head from 'next/head';
import { MouseEvent, useState } from 'react';
import { classNames } from 'utils';
import { CenteredLayout } from '../../components/ui';

const ForgotPassword: NextPage = () => {
  const [status, setStatus] = useState<
    'INIT' | 'LOADING' | 'SUCCESS' | 'ERROR'
  >('INIT');

  const resetPassword = async (e: MouseEvent<HTMLButtonElement>) => {
    setStatus('LOADING');
    try {
      await axios.get('/api/verify-email/send-email');
      setStatus('SUCCESS');
    } catch (e) {
      setStatus('ERROR');
    }
  };

  if (status === 'ERROR') {
    return (
      <CenteredLayout>
        <div>
          <div className="heading1 mb-4">Failed to send email</div>
          <div className="my-2">
            <p>
              Something went wrong? Try refreshing the page once again and let
              us know if the problem persists
            </p>
          </div>
        </div>
      </CenteredLayout>
    );
  }
  if (status === 'SUCCESS') {
    return (
      <CenteredLayout>
        <div>
          <div className="heading1 mb-4">Successfully sent email</div>
          <div className="my-2">
            <p>
              Check your email inbox. You&apos;ll receive an email with a
              verification link. Click on the link to verify your email
            </p>
            <p>
              If you&apos;ve not received the email, try checking your spam
              folder
            </p>
          </div>
        </div>
      </CenteredLayout>
    );
  }

  return (
    <CenteredLayout>
      <Head>
        <title>Verify email</title>
      </Head>
      <div>
        <div className="heading1 mb-4">Thanks for signing up!</div>
        <div className="my-2">
          <p>
            A verification email has been sent to the email address you
            provided. Please verify your email to unlock to full site features.
          </p>
          <p>Or you can resend the email</p>
          <button
            className={classNames(
              'btn mt-2',
              status === 'LOADING' ? 'cursor-not-allowed opacity-50' : ''
            )}
            onClick={resetPassword}
          >
            {status === 'LOADING' ? 'Sending...' : 'Resend Verification Email'}
          </button>
        </div>
      </div>
    </CenteredLayout>
  );
};

export default ForgotPassword;
