import { parseISO } from 'date-fns';

/**
 * Returns if a block should be allowed to edit.
 */
export const showBlock = (to: Date): boolean => {
  const currentTime = new Date();
  const toTime = parseISO(`${to}`);
  return currentTime.getTime() > toTime.getTime();
};
