import { validateRoute, prisma } from 'lib';

/**
 * Updates the activity for a log entry. This API route needs two parameters in req.body
 * 1. logId: The id of the log entry to update
 * 2. activityId: The id of the activity to update the log entry with
 */
export default validateRoute(async (req, res, user) => {
  // Don't allow if user is not verified
  if (!user.isVerified) {
    res.status(403);
    res.json({ error: 'Email not verified' });
    return;
  }
  // If method is not post, throw error
  if (req.method !== 'POST') {
    res.status(405);
    res.json({ error: 'Method not allowed' });
    return;
  }

  // Fetch the activity with activityId
  const activity = await prisma.activity.findFirst({
    where: { id: req.body.activityId, userId: user.id },
  });

  // If activity is not found, throw error
  if (!activity) {
    res.status(404);
    res.json({ error: 'Activity not found' });
    return;
  }

  // Get a log with the id, and update it.
  const logToUpdate = await prisma.log.findFirst({
    where: { id: req.body.blockId, userId: user.id },
  });
  if (!logToUpdate) {
    return res.status(400);
  }
  const log = await prisma.log.update({
    where: { id: req.body.blockId },
    data: {
      activity: { connect: { id: activity.id } },
      notes: req.body.notes,
    },
  });

  return res.json(log);
});
