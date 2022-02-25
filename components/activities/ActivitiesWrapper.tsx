import { Activity } from '@prisma/client';
import { ReactNode, useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { activitiesState } from './activitiesState';
import { useActivities } from './useActivitiesHook';

// Fetches activities and puts them in the state.
export const ActivitiesWrapper = ({ children }: { children: ReactNode }) => {
  const [activities, setActivities] = useRecoilState(activitiesState);
  const { activities: fetchedActivities, isLoading, isError } = useActivities();

  useEffect(() => {
    if (
      fetchedActivities &&
      activities.length < fetchedActivities.length &&
      !isLoading &&
      !isError
    ) {
      const mappedActivities: Activity[] = fetchedActivities;
      setActivities(mappedActivities);
    }
  }, [activities, fetchedActivities, isError, isLoading, setActivities]);

  return <>{children}</>;
};
