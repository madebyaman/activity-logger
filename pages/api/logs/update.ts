import { validateRoute } from '../../../utils';
import prisma from '../../../utils/prisma';

/**
 * Updates the activity for a log entry. This API route needs two parameters in req.body
 * 1. logId: The id of the log entry to update
 * 2. activityId: The id of the activity to update the log entry with
 */
export default validateRoute(async (req, res, user) => {
  // If method is not post, throw error
  if (req.method !== 'POST') {
    res.status(405);
    res.json({ error: 'Method not allowed' });
    return;
  }

  // Fetch the activity with activityId
  const activity = await prisma.activity.findUnique({
    where: { id: req.body.activityId },
  });

  // If activity is not found, throw error
  if (!activity) {
    res.status(404);
    res.json({ error: 'Activity not found' });
    return;
  }

  // Get a log with the id, and update it.
  const log = await prisma.log.update({
    where: { id: req.body.blockId },
    data: {
      activity: { connect: { id: activity.id } },
    },
  });

  return res.json(log);
});
