import { useEffect } from 'react';
import { Log } from '@prisma/client';
import { useRecoilState, useRecoilValue } from 'recoil';

import { useBlocks } from './useBlocks';
import { blockState } from './state';
import { showBlock } from './utils';
import { convertNumberToHour } from '../../utils';
import { profileState } from '../user';
import { ShowBlock } from './ShowBlock';
import { ActivitiesWrapper } from '../activities';

export const Blocks = ({}) => {
  const profile = useRecoilValue(profileState);
  const { sleepFrom, sleepTo, blocksPerHour } = profile;
  const { blocks: newBlocks, isLoading, isError } = useBlocks();

  const [blocks, setBlocks] = useRecoilState(blockState);

  // Update the blocks when no blocks found.
  useEffect(() => {
    if (!blocks.length && !isLoading && !isError) {
      setBlocks(newBlocks);
    }
  }, [blocks.length, isError, isLoading, newBlocks, setBlocks]);

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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error!</div>;
  }

  return (
    <ActivitiesWrapper>
      <div className="mt-20">
        {/* Create array of [1, .. 23] */}
        {blocks.length
          ? Array.from(Array(24).keys())
              // But eliminate sleep hours.
              .filter(filterBlocks)
              // Map for each hour
              .map((currentHour) => {
                return (
                  <div
                    key={currentHour}
                    className={`grid grid-cols-3 ${gridColumns[blocksPerHour]}`}
                  >
                    <h3 className="font-sans text-4xl place-self-center">
                      {convertNumberToHour(currentHour)}
                    </h3>
                    {/* Inside each hour, render its blocks */}
                    {blocks
                      .filter(({ hour }) => hour === currentHour)
                      .sort(sortBlocks)
                      .map((timeBlock) => {
                        const { id, to, activityId } = timeBlock;
                        return (
                          <div
                            key={id}
                            className={`min-w-full h-28 px-3 py-6 bg-slate-50 grid col-span-2 col-start-2 md:col-start-auto ${
                              new Date(`${to}`).getMinutes() !== 0 && 'border-r'
                            }`}
                          >
                            {showBlock(to) ? (
                              <ShowBlock id={id} activityId={activityId} />
                            ) : (
                              ''
                            )}
                          </div>
                        );
                      })}
                  </div>
                );
              })
          : 'No blocks found'}
      </div>
    </ActivitiesWrapper>
  );
};
