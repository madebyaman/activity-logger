/**
 * Returns if a block should be allowed to edit.
 * @param to Date -- time where the current block ends
 * @returns boolean -- true if `to` is less than current time
 */
export const showBlock = (to: Date): boolean => {
  const currentTime = new Date(Date.now());
  return new Date(to) <= currentTime;
};
