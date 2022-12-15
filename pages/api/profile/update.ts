import { prisma, validateRoute } from '../../../lib';

/**
 * Calls `validateRoute` function and returns updated profile.
 * @param req.body - {firstName, lastName, blocksPerHour, sleepFrom, sleepTo}
 */
export default validateRoute(async (req, res, user) => {
  // If method is not post, throw error
  if (req.method !== 'POST') {
    res.status(405);
    res.json({ error: 'Method not allowed' });
    return;
  }

  const updateProfile = await prisma.profile.update({
    where: {
      userId: user.id,
    },
    data: req.body,
  });

  return res.json(updateProfile);
});
