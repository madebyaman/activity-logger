import { compareAsc } from 'date-fns';

/**
 * Returns if a block should be allowed to edit.
 */
export const showBlock = (to: Date): boolean => {
  const currentTime = new Date();
  console.log(to);
  return compareAsc(new Date(to), currentTime) === -1 ? true : false;
};
