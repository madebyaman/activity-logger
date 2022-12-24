import { set, sub } from 'date-fns';

// Initialize a blank state to start tracking activities
type TimeLog = {
  from: Date;
  to: Date;
  hour: number;
  date: string;
};
export const newBlocks = ({
  noOfBlocksPerHour = 4,
  date,
}: {
  noOfBlocksPerHour: number;
  date: string;
}): TimeLog[] => {
  let initialTimeLog: TimeLog[] = [];
  const day = date.split('/')[0];

  Array.from(Array(24).keys()).map((hour) => {
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
        date: Number(day),
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
