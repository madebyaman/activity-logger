import { TimeLog } from '../types';

const ALLOWBLOCKEDITBEFOREHOURS = 2;
const MINUTESBEFORELASTUPDATE = 1;

export function allowBlockToEdit(block: TimeLog): Boolean {
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
  if (block.lastUpdated) {
    ifUpdatedWithinLastMinutes = block.lastUpdated > timeFiveMinutesBefore;
  }

  return (
    block.to < timeRightNow &&
    (block.to > timeTwoHoursBefore ||
      !block.activity ||
      ifUpdatedWithinLastMinutes)
  );
}
