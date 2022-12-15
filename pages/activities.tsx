import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { MouseEvent, ReactNode } from 'react';
import { useSWRConfig } from 'swr';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { Activity } from '../components/Activity';
import { ActivityTypes, NextPageWithAuth } from '../types';
import { fetcher, useActivities } from '../utils';
import { SlideOver } from '../components/ui';

const Activities: NextPageWithAuth = () => {
  const { isLoading, activities, isError } = useActivities();
  const router = useRouter();
  const { mutate } = useSWRConfig();

  // Sorting activities logic
  let sortProp: string;
  let desc: string;
  if (typeof router.query.sort === 'string') {
    [sortProp, desc] = router.query.sort.split(':');
  }

  // Open activities logic
  let openedActivityId: string;
  if (typeof router.query.activity === 'string') {
    openedActivityId = router.query.activity;
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
    await fetcher('/activities/update', { id, name, type });
    mutate('/activities');
  };

  const deleteActivity = async (id: number) => {
    const updatedActivities = activities.filter(
      (activity) => activity.id !== id
    );
    mutate('/activities', updatedActivities, false);
    await fetcher('/activities/delete', { id });
    mutate('/activities');
  };

  if (isLoading) {
    return <p>Loading...</p>;
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

  const onClickActivity = (
    id: string,
    e?: MouseEvent<HTMLButtonElement>
  ): string => {
    e && e.preventDefault();
    const urlParams = new URLSearchParams();
    const sortParam = router.query.sort;
    typeof sortParam === 'string' && urlParams.set('sort', sortParam);
    urlParams.set('activity', id);
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
          {activities.length &&
            sortedActivities.map((activity) => (
              <Activity
                key={activity.id}
                activity={activity}
                updateActivity={updateActivity}
                onDelete={deleteActivity}
                onClick={onClickActivity}
              />
            ))}
        </tbody>
      </table>
      {openedActivityId && (
        <SlideOver onClose={closeActivity} title="Activity Notes">
          Hello
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
