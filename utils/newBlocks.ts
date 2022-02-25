// Initialize a blank state to start tracking activities

import { getDateString } from '.';

type TimeLog = {
  from: Date;
  to: Date;
  hour: number;
  date: string;
};

export const newBlocks = (noOfBlocksPerHour: number = 4): TimeLog[] => {
  let initialTimeLog: TimeLog[] = [];
  const date = getDateString(new Date());

  Array.from(Array(24).keys()).map((hour) => {
    Array.from(Array(noOfBlocksPerHour).keys()).map((block) => {
      let fromMinutes;
      // toMinutes will always be 15, 30, 45 or 60.
      const toMinutes = (60 / noOfBlocksPerHour) * (block + 1);
      if (block === 0) {
        fromMinutes = 0;
      } else {
        fromMinutes = (60 / noOfBlocksPerHour) * block + 1;
      }
      const from = new Date(Date.now());
      from.setHours(hour);
      from.setMinutes(fromMinutes);
      from.setSeconds(0);
      const to = new Date(Date.now());
      to.setHours(hour);
      to.setMinutes(toMinutes);
      to.setSeconds(0);
      initialTimeLog.push({
        from,
        to,
        hour,
        date,
      });
    });
  });
  return initialTimeLog;
};
