import { parseISO } from 'date-fns';

/**
 * Returns if a block should be allowed to edit.
 */
export const showBlock = (to: Date): boolean => {
  const currentTime = new Date();
  const toTime = parseISO(`${to}`);
  if (currentTime.getTime() > toTime.getTime()) {
    return true;
  } else {
    return false;
  }
};
