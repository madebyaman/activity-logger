import Block from './Block';
import { useContext, useEffect, useState } from 'react';
import { Log } from '@prisma/client';
import { UserPreferencesContext } from '../ProfileContext';
import { fetcher } from '../../utils/fetcher';
import { useRecoilState } from 'recoil';
import { blockState } from './blockState';
import useLoading from '../../hooks/useLoading';

export const blockTypeColors = {
  Neutral: 'bg-gray-500',
  Productive: 'bg-green-300',
  'Very Productive': `bg-green-600`,
  Distracting: `bg-orange-400`,
  'Very Distracting': `bg-red-700`,
};

/**
 * PROPS
 * 1. `onAdd`: Func to call when adding a new activity.
 * 2. `onUpdate`: Func to call when updating activity for a block.
 */
const TimeGrid = ({
  onAdd,
  onUpdate,
}: {
  onAdd: (input: string, blockId: number) => void;
  onUpdate: (blockId: number, activityId: number) => Promise<void>;
}) => {
  const { userPreferences } = useContext(UserPreferencesContext);
  const { sleepFrom, sleepTo, blocksPerHour } = userPreferences;

  const [blocks, setBlocks] = useRecoilState(blockState);
  const { state, dispatch } = useLoading();

  useEffect(() => {
    // To stop fetching once component is unmounted.
    let isSubscribed = true;

    if (!blocks.length && isSubscribed) {
      (async function () {
        dispatch({ type: 'LOADING' });
        // First send post request to /api/logs/add
        try {
          const logs = (await fetcher('/logs')) as Log[];
          if (logs) {
            setBlocks(logs);
          }
        } catch (error) {
          dispatch({ type: 'ERROR', payload: 'Error fetching block state' });
        } finally {
          dispatch({ type: 'LOADED' });
        }
      })();
    }

    return () => {
      isSubscribed = false;
    };
  }, [blocks, setBlocks, dispatch]);

  // This is to make sure purge css works correctly in Tailwind
  const gridColumns = {
    1: 'md:grid-cols-3',
    2: 'md:grid-cols-5',
    4: 'md:grid-cols-9',
  };

  /**
   * Filter out blocks that come in sleep time.
   */
  const filterBlocks = (hour: number) => {
    if (sleepFrom > sleepTo) {
      if (hour >= sleepFrom && hour <= 24) return false;
      if (hour >= 0 && hour < sleepTo) return false;
      return true;
    } else {
      if (hour >= sleepFrom && hour < sleepTo) return false;
      return true;
    }
  };

  /**
   * Sort function to sort blocks by start time.
   */
  const sortBlocks = (a: Log, b: Log) => {
    if (a.from < b.from) return -1;
    if (a.from > b.from) return 1;
    return 0;
  };

  if (state.status === 'LOADING') {
    return <div>Loading...</div>;
  }

  if (state.status === 'ERROR') {
    return <div>Error!</div>;
  }

  return (
    <div className="mt-10">
      {/* Create array of [1, .. 23] */}
      {blocks.length
        ? Array.from(Array(24).keys())
            // But eliminate sleep hours.
            .filter(filterBlocks)
            // Map for each hour and show as one column
            .map((currentHour) => {
              return (
                <div
                  key={currentHour}
                  className={`grid grid-cols-3 ${gridColumns[blocksPerHour]}`}
                >
                  <h3 className="font-sans text-4xl place-self-center">
                    {currentHour}
                  </h3>
                  {/* Inside each hour, render its blocks */}
                  {blocks
                    .filter(({ hour }) => hour === currentHour)
                    .sort(sortBlocks)
                    .map((timeBlock) => {
                      const { id, to } = timeBlock;
                      return (
                        <div
                          key={id}
                          className={`min-w-full h-28 px-3 py-6 bg-slate-50 grid place-content-center col-span-2 col-start-2 md:col-start-auto ${
                            new Date(`${to}`).getMinutes() !== 0 && 'border-r'
                          }`}
                        >
                          <Block
                            id={id}
                            activityId={timeBlock.activityId}
                            onAddActivity={onAdd}
                            onUpdate={onUpdate}
                          />
                        </div>
                      );
                    })}
                </div>
              );
            })
        : 'No blocks found'}
    </div>
  );
};

export default TimeGrid;
