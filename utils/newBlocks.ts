import { add, set, sub } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';

// Initialize a blank state to start tracking activities
type TimeLog = {
  from: Date;
  to: Date;
  hour: number;
  date: string;
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

export const newBlocks = ({
  sleepFrom,
  sleepTo,
  noOfBlocksPerHour = 4,
  date,
}: {
  noOfBlocksPerHour: number;
  sleepFrom: number;
  sleepTo: number;
  date: string;
}): TimeLog[] => {
  let initialTimeLog: TimeLog[] = [];

  Array.from(Array(24).keys())
    .filter((i) => filterBlocks({ hour: i, sleepFrom, sleepTo }))
    .map((hour) => {
      Array.from(Array(noOfBlocksPerHour).keys()).map((block) => {
        let fromMinutes;
        // toMinutes will always be 15, 30, 45 or 60.
        const toMinutes = (60 / noOfBlocksPerHour) * (block + 1);
        if (block === 0) {
          fromMinutes = 0;
        } else {
          fromMinutes = (60 / noOfBlocksPerHour) * block;
        }
        const from = set(new Date(), {
          hours: hour,
          minutes: fromMinutes,
          seconds: 0,
          milliseconds: 0,
        });
        const fromOffseted = sub(from, {
          minutes: new Date().getTimezoneOffset(),
        });
        const to = set(new Date(), {
          hours: hour,
          minutes: toMinutes,
          seconds: 0,
          milliseconds: 0,
        });
        const toOffsetted = sub(to, {
          minutes: new Date().getTimezoneOffset(),
        });
        initialTimeLog.push({
          from: fromOffseted,
          to: toOffsetted,
          hour,
          date,
        });
      });
    });

  return initialTimeLog;
};
