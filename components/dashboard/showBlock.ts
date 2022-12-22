/**
 * Returns if a block should be allowed to edit.
 */
export const showBlock = (to: string | Date): boolean => {
  const currentTime = new Date();
  const toTime = new Date(to);
  if (currentTime > toTime) {
    console.log(toTime, currentTime);
  }
  return currentTime > toTime;
};
