import { ReactNode, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { ActivitySelect, ActivityType } from '../../types';
import { useActivities } from '../../utils/hooks';
import { activitiesState } from './state';

// Fetches activities and puts them in the state.
const ActivitiesFetchWrapper = ({ children }: { children: ReactNode }) => {
  const [activities, setActivities] = useRecoilState(activitiesState);
  const { activities: fetchedActivities, isLoading, isError } = useActivities();

  useEffect(() => {
    if (
      fetchedActivities &&
      activities.length < fetchedActivities.length &&
      !isLoading &&
      !isError
    ) {
      const mappedActivities: ActivitySelect[] = fetchedActivities.map(
        (activity) => ({
          label: activity.name,
          value: activity.id,
          type: activity.type as ActivityType,
        })
      );
      setActivities(mappedActivities);
    }
  }, [activities, fetchedActivities, isError, isLoading, setActivities]);

  return <>{children}</>;
};

export default ActivitiesFetchWrapper;
