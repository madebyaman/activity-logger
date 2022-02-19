export const allowBlockEdit = (to: Date): boolean => {
  const currentTime = new Date(Date.now());
  return to <= currentTime;
};
