import { add } from 'date-fns';

/**
 * Returns if a block should be allowed to edit.
 */
export const showBlock = (to: string | Date): boolean => {
  const offset = new Date().getTimezoneOffset();
  const currentTime = add(new Date(), { minutes: offset });
  const toTime = new Date(to);
  if (currentTime.getTime() > toTime.getTime()) {
    return true;
  } else {
    return false;
  }
};
