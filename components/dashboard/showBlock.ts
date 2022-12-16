/**
 * Returns if a block should be allowed to edit.
 */
export const showBlock = (to: Date): boolean => {
  const currentTime = new Date();
  return new Date(to.toString()) <= currentTime;
};
