import { ReactNode, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { useActivities } from '../../utils/hooks';
import { activitiesState } from './activitiesState';

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
      setActivities(fetchedActivities);
    }
  }, [activities, fetchedActivities, isError, isLoading, setActivities]);

  return <>{children}</>;
};

export default ActivitiesFetchWrapper;
