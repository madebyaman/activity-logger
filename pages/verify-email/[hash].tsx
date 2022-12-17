import axios from 'axios';
import { CenteredLayout } from 'components/ui';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const VerifyEmail: NextPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();
  const { hash } = router.query;

  useEffect(() => {
    const controller = new AbortController();
    const loadVerification = async () => {
      try {
        const response = await axios.put(
          '/api/verify-email',
          {
            verificationString: hash,
          },
          { signal: controller.signal }
        );
        setIsSuccess(true);
      } catch (e) {
        setIsSuccess(false);
      } finally {
        setIsLoading(false);
      }
    };
    loadVerification();

    return () => controller.abort();
  }, [hash]);

  if (isLoading) {
    return (
      <CenteredLayout>
        <Head>
          <title>Verify email</title>
        </Head>
        <div className="heading1 text-3xl">Loading...</div>
      </CenteredLayout>
    );
  }

  if (!isLoading && !isSuccess) {
    return (
      <CenteredLayout>
        <div className="heading1 mb-4">Failed to verify your email</div>
        <div className="my-2">
          <p className="text-base text-gray-700">
            An error ocurred while we were trying to verify your email. You can
            try again.
          </p>
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
        <div className="heading1 mb-4">Successfully Verified</div>
        <div className="my-2">
          <p>
            Congrats! Your email is now verified. You can start using the app.
          </p>
        </div>
        <Link className="btn inline-block mt-2" href={'/dashboard'}>
          Start using the app
        </Link>
      </div>
    </CenteredLayout>
  );
};

export default VerifyEmail;
