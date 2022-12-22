import { add, parseISO } from 'date-fns';

/**
 * Returns if a block should be allowed to edit.
 */
export const showBlock = (to: string): boolean => {
  const offset = new Date().getTimezoneOffset();
  const currentTime = new Date();
  const parsedDate = parseISO(`${to}`);
  const toTime = add(parsedDate, { minutes: offset - 720 }); // Negative b/c it needs to convert GMT to local time
  if (currentTime.getTime() > toTime.getTime()) {
    return true;
  } else {
    return false;
  }
};
