import { NextPage } from 'next';
import Head from 'next/head';
import { CenteredLayout } from '../../components/ui';

const ForgotPassword: NextPage = () => {
  return (
    <CenteredLayout>
      <Head>
        <title>Verify email</title>
      </Head>
      <div>
        <div className="heading1">Thanks for signing up!</div>
        <div className="">
          <p>
            A verification email has been sent to the email address you
            provided. Please verify your email to unlock to full site features.
          </p>
          <p>Or you can resend the email</p>
        </div>
        <button>Resend verification email</button>
      </div>
    </CenteredLayout>
  );
};

export default ForgotPassword;
