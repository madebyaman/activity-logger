import { Log } from '@prisma/client';

const ALLOWBLOCKEDITBEFOREHOURS = 2;
const MINUTESBEFORELASTUPDATE = 1;

export function allowBlockToEdit(block: Log): Boolean {
  const timeRightNow = new Date(Date.now());
  const timeTwoHoursBefore = new Date(Date.now());
  timeTwoHoursBefore.setHours(
    timeTwoHoursBefore.getHours() - ALLOWBLOCKEDITBEFOREHOURS
  );
  const timeFiveMinutesBefore = new Date(Date.now());
  timeFiveMinutesBefore.setMinutes(
    timeFiveMinutesBefore.getMinutes() - MINUTESBEFORELASTUPDATE
  );
  // 1. When block.to < timeRightNow
  // 2. AND
  // 3. block.to > 2 hours before right now
  // 4. OR !block.activity
  // 5. OR  block.activity updated within 5 minutes.
  let ifUpdatedWithinLastMinutes: Boolean = false;
  if (block.updatedAt) {
    ifUpdatedWithinLastMinutes = block.updatedAt > timeFiveMinutesBefore;
  }

  return (
    block.to < timeRightNow &&
    (block.to > timeTwoHoursBefore ||
      !block.activityId ||
      ifUpdatedWithinLastMinutes)
  );
}
