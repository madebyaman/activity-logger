import { add } from 'date-fns';

/**
 * Returns if a block should be allowed to edit.
 */
export const showBlock = (to: string | Date): boolean => {
  const offset = new Date().getTimezoneOffset();
  const currentTime = new Date();
  const toTime = add(new Date(to), { minutes: offset });
  if (currentTime.getTime() > toTime.getTime()) {
    return true;
  } else {
    return false;
  }
};
