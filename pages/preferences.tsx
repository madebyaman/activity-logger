import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { useSWRConfig } from 'swr';
import { FlashMessageContext } from '../components/FlashMessage';
import { h3Classes } from 'components/ui';
import { UserPreferencesForm } from '../components/user/preferencesForm';
import { NextPageWithAuth } from '../types';
import { useProfile } from '../utils';

const Preferences: NextPageWithAuth = () => {
  const { isLoading, isError, profile } = useProfile();
  const [profileState, setProfileState] = useState({
    blocksPerHour: 2,
    sleepFrom: 10,
    sleepTo: 6,
    firstName: '',
    lastName: '',
  });

  useEffect(() => {
    let unmounted = false;
    !unmounted && setProfileState(profile.profile);
    return () => {
      unmounted = true;
    };
  }, [profile]);

  const [loading, setLoading] = useState(false);
  const { mutate } = useSWRConfig();
  const router = useRouter();
  const { setFlashMessages } = useContext(FlashMessageContext);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (profileState !== null) {
        const blocksPerHour =
          profileState.blocksPerHour &&
          (profileState.blocksPerHour === 1 ||
            profileState.blocksPerHour === 2 ||
            profileState.blocksPerHour === 4)
            ? profileState.blocksPerHour
            : 2;
        await axios.post('/api/profile/update', {
          ...profileState,
          blocksPerHour,
        });
        router.push('/dashboard');
      }
    } catch {
      setFlashMessages &&
        setFlashMessages((prevMessages) => [
          ...prevMessages,
          {
            title: 'Error',
            message:
              'Something went wrong while saving your profile. Please try again.',
            type: 'error',
          },
        ]);
    } finally {
      setLoading(false);
      mutate('/profile');
    }
  };

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <div>
      <Head>
        <title>User preferences</title>
      </Head>
      <div>
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h2 className={h3Classes + ' font-display'}>Profile</h2>
              <p className="mt-1 text-sm text-gray-600">
                This is your personal information. It will be used to improve
                your app experience.
              </p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <UserPreferencesForm
              profile={profileState}
              onSubmit={handleSubmit}
              formSubmitting={loading}
              updateState={setProfileState}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

Preferences.protectedRoute = true;

export default Preferences;
