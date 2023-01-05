import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { MouseEvent, ReactNode, useContext } from 'react';
import { useSWRConfig } from 'swr';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { ActivityRow } from '@/components/activity';
import { ActivityTypes, NextPageWithAuth } from '@/types';
import { useActivities } from '@/utils';
import { SlideOver, Spinner } from '@/components/ui';
import { ShowActivity } from '@/components/activity';
import { Activity } from '@prisma/client';
import axios from 'axios';
import { FlashMessageContext } from '@/components/FlashMessage';

const Activities: NextPageWithAuth = () => {
  const { isLoading, activities, isError } = useActivities();
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const { setFlashMessages } = useContext(FlashMessageContext);

  // Sorting activities logic
  let sortProp: string;
  let desc: string;
  if (typeof router.query.sort === 'string') {
    [sortProp, desc] = router.query.sort.split(':');
  }

  // Open activities logic
  let openedActivity: Activity | undefined = undefined;
  if (typeof router.query.activity === 'string') {
    const openedActivityId = router.query.activity;
    openedActivity =
      activities &&
      activities.find((activity) => activity.id === Number(openedActivityId));
  }

  const updateActivity = async ({
    id,
    name,
    type,
  }: {
    id: number;
    name: string;
    type: ActivityTypes;
  }) => {
    const updatedActivities = activities.map((activity) => {
      if (activity.id === id) {
        return {
          ...activity,
          type: type,
          name: name,
        };
      }
      return activity;
    });
    mutate('/activities', updatedActivities, false);
    try {
      await axios.post('/api/activities/update', { id, name, type });
    } catch (error) {
      setFlashMessages &&
        setFlashMessages((prevMessages) => [
          ...prevMessages,
          {
            title: '🔴 Error updating',
            type: 'error',
            message: 'Unable to update the activity',
          },
        ]);
    } finally {
      mutate('/activities');
    }
  };

  const deleteActivity = async (id: number) => {
    const updatedActivities = activities.filter(
      (activity) => activity.id !== id
    );
    mutate('/activities', updatedActivities, false);
    try {
      await axios.delete(`/api/activities/delete/${id}`);
    } catch (error) {
      setFlashMessages &&
        setFlashMessages((prevMessages) => [
          ...prevMessages,
          {
            title: '🔴 Error',
            type: 'error',
            message: 'Unable to delete the activity',
          },
        ]);
    } finally {
      mutate('/activities');
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <p>Error</p>;
  }

  const thClasses =
    'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider';

  const sortedActivities = [...activities].sort((a, b) => {
    if (sortProp === 'name' || sortProp === 'type') {
      return desc
        ? b[sortProp]?.localeCompare(a[sortProp])
        : a[sortProp]?.localeCompare(b[sortProp]);
    } else {
      return 0;
    }
  });

  const activityLink = (id: number): string => {
    const urlParams = new URLSearchParams();
    const sortParam = router.query.sort;
    typeof sortParam === 'string' && urlParams.set('sort', sortParam);
    urlParams.set('activity', id.toString());
    const currentUrl = window.location.origin + window.location.pathname;
    const newUrl = currentUrl + '?' + urlParams.toString();
    return newUrl;
  };

  const closeActivity = (e?: MouseEvent<HTMLButtonElement>) => {
    e && e.preventDefault();
    const urlParams = new URLSearchParams();
    const sortParam = router.query.sort;
    typeof sortParam === 'string' && urlParams.set('sort', sortParam);
    const currentUrl = window.location.origin + window.location.pathname;
    const newUrl = currentUrl + '?' + urlParams.toString();
    router.push(newUrl);
  };

  return (
    <>
      <Head>
        <title>Your Activities</title>
      </Head>
      {activities.length ? (
        <table className="min-w-full divide-y divide-gray-200 table-auto">
          <thead className="bg-gray-100">
            <tr>
              <SortableColumn prop="name">Activity Name</SortableColumn>
              <SortableColumn prop="type">Activity Type</SortableColumn>
              <th className={thClasses}>Edit</th>
              <th className={thClasses}>Delete</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedActivities.map((activity) => (
              <ActivityRow
                key={activity.id}
                activity={activity}
                updateActivity={updateActivity}
                onDelete={deleteActivity}
                link={activityLink(activity.id)}
              />
            ))}
          </tbody>
        </table>
      ) : (
        'Add new activities in Dashboard'
      )}
      {openedActivity && (
        <SlideOver onClose={closeActivity} title={openedActivity.name}>
          <ShowActivity activity={openedActivity} />
        </SlideOver>
      )}
    </>
  );
};

function SortableColumn({
  prop,
  children,
}: {
  prop: string;
  children: ReactNode;
}) {
  const router = useRouter();
  let [sortProp, desc] =
    typeof router.query.sort === 'string' ? router.query.sort.split(':') : [];
  let newSort: string | null = null;

  if (sortProp !== prop) {
    newSort = prop;
  } else if (sortProp === prop && !desc) {
    newSort = `${prop}:desc`;
  }

  const searchParams = newSort ? new URLSearchParams({ sort: newSort }) : null;

  return (
    <th
      scope="col"
      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
    >
      <Link
        className="inline-flex cursor-pointer group"
        href={newSort ? `?${searchParams}` : `?`}
        passHref
      >
        {children}
        <span
          className={`${
            sortProp === prop
              ? 'text-gray-900 '
              : 'invisible group-hover:visible text-gray-500 '
          } flex-none ml-2 rounded`}
        >
          <ChevronDownIcon
            className={`${desc ? 'rotate-180 ' : ' '} w-4 h-4`}
            aria-hidden="true"
          />
        </span>
      </Link>
    </th>
  );
}

Activities.protectedRoute = true;

export default Activities;
