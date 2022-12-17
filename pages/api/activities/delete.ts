import { validateRoute, prisma } from 'lib';

export default validateRoute(async (req, res, user) => {
  // Don't allow if user is not verified
  if (!user.isVerified) {
    res.status(403);
    res.json({ error: 'Email not verified' });
    return;
  }
  try {
    const deletedActivity = await prisma.activity.delete({
      where: { id: req.body.id },
    });
    return res.status(200).json(deletedActivity);
  } catch (e) {
    return res.status(400).json({ error: 'Activity not found' });
  }
});
