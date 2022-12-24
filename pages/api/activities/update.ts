import { validateRoute, prisma } from '../../../lib';

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

  const id = Number(req.body.id);
  if (Number.isNaN(id)) return res.status(400);

  try {
    const activityToUpdate = await prisma.activity.findFirst({
      where: { AND: [{ id }, { userId: user.id }] },
    });
    if (activityToUpdate) {
      const updateActivity = await prisma.activity.update({
        where: { id },
        data: {
          name: req.body.name,
          type: req.body.type,
        },
      });
      return res.json(updateActivity);
    } else {
      return res.status(400);
    }
  } catch (e) {
    // If no activity is found, prisma throws an exception 'RecordNotFound'
    // https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#update
    return res.status(400).json({ error: 'Activity not found' });
  }
});
