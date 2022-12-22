import { zonedTimeToUtc } from 'date-fns-tz';

/**
 * Returns if a block should be allowed to edit.
 */
export const showBlock = (to: string | Date): boolean => {
  const currentTime = zonedTimeToUtc(new Date(), 'Europe/London');
  const toTime = new Date(to);
  if (currentTime.getTime() > toTime.getTime()) {
    return true;
  } else {
    return false;
  }
};
