import { ReactNode, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { BlocksPerHourType } from '../../types';
import { profileState } from './profileState';
import { useProfile } from './useProfileHook';

export const ProfileWrapper = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useRecoilState(profileState);
  const { profile: newProfile } = useProfile();

  useEffect(() => {
    if (!profile && newProfile) {
      setProfile({
        ...newProfile,
        blocksPerHour: newProfile.blocksPerHour as BlocksPerHourType,
      });
    }
  }, [profile, newProfile, setProfile]);

  return <>{children}</>;
};
