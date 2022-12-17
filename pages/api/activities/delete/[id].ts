import { validateRoute, prisma } from 'lib';

export default validateRoute(async (req, res, user) => {
  // Don't allow if user is not verified
  if (!user.isVerified) {
    res.status(403);
    res.json({ error: 'Email not verified' });
    return;
  }
  // If method is not delete, throw error
  if (req.method !== 'DELETE') {
    res.status(405);
    res.json({ error: 'Method not allowed' });
    return;
  }

  const id = Number(req.query.id);
  if (Number.isNaN(id)) {
    res.status(400);
    res.json({ error: 'Bad request' });
    return;
  }

  try {
    const deletedActivity = await prisma.activity.delete({
      where: { id },
    });
    return res.status(200).json(deletedActivity);
  } catch (e) {
    return res.status(400).json({ error: 'Activity not found' });
  }
});
