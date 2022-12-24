import { add, parseISO, sub } from 'date-fns';

/**
 * Returns if a block should be allowed to edit.
 */
export const showBlock = (to: Date): boolean => {
  const currentTime = new Date();
  const toTime = parseISO(`${to}`);
  const toOffsetted = add(toTime, {
    minutes: new Date().getTimezoneOffset(),
  });
  return currentTime.getTime() > toOffsetted.getTime();
};
