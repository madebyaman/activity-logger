import { Log, Profile } from '@prisma/client';

import { convertNumberToHour } from '@/utils';
import { Block } from './Block';
import { showBlock } from './showBlock';
import { add, parseISO } from 'date-fns';

type BlocksComponentProps = {
  isError?: string;
  profile: Profile;
  blocks: Log[];
};
export const Blocks = (props: BlocksComponentProps) => {
  // This is to make sure purge css works correctly in Tailwind
  const gridColumns = {
    1: 'md:grid-cols-3',
    2: 'md:grid-cols-5',
    4: 'md:grid-cols-9',
  };

  // Count the number of blocks per hour
  const blocksPerHourCount = (blocks: Log[]) => {
    return blocks.length === 24 ? 1 : blocks.length === 48 ? 2 : 4;
  };

  /**
   * Filter out blocks that come in sleep time.
   */
  const filterBlocks = ({
    hour,
    sleepFrom,
    sleepTo,
  }: {
    hour: number;
    sleepFrom: Number;
    sleepTo: Number;
  }) => {
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
    const from = new Date(a.from);
    const bfrom = new Date(b.from);
    if (from < bfrom) return -1;
    if (from > bfrom) return 1;
    return 0;
  };

  if (props.isError) {
    return <div>Error loading blocks</div>;
  }

  return (
    <div className="mt-4">
      {/* Create array of [1, .. 23] */}
      {props.blocks
        ? Array.from(Array(24).keys())
            // But eliminate sleep hours.
            .filter((hour) =>
              filterBlocks({
                hour,
                sleepFrom: props.profile.sleepFrom,
                sleepTo: props.profile.sleepTo,
              })
            )
            // Map for each hour
            .map((currentHour) => {
              return (
                <div
                  key={currentHour.toString()}
                  className={`grid grid-cols-3 ${
                    gridColumns[blocksPerHourCount(props.blocks)]
                  }`}
                >
                  <h3 className="heading text-xl place-self-center md:text-2xl">
                    {convertNumberToHour(currentHour)}
                  </h3>
                  {/* Inside each hour, render its blocks */}
                  {props.blocks
                    .filter(({ hour }) => hour === currentHour)
                    .sort(sortBlocks)
                    .map((timeBlock) => {
                      const { id, to, activityId, notes } = timeBlock;
                      const toTime = parseISO(`${to}`);
                      const toOffsetted = add(toTime, {
                        minutes: new Date().getTimezoneOffset(),
                      });
                      return (
                        <div
                          key={id}
                          className={`blocks min-w-full h-28 px-3 py-6 bg-gray-100 grid col-span-2 col-start-2 md:col-start-auto place-content-center hover:bg-gray-200 ${
                            toOffsetted.getMinutes() !== 0 && 'border-r'
                          }`}
                        >
                          {showBlock(to) ? (
                            <Block
                              id={id}
                              activityId={activityId}
                              notes={notes || ''}
                            />
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
  );
};
