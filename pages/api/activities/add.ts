import { validateRoute, prisma } from 'lib';

/**
 * Calls `validateRoute` function and return activities[] or error.
 */
export default validateRoute(async (req, res, user) => {
  // Don't allow if user is not verified
  if (!user.isVerified) {
    res.status(403);
    res.json({ error: 'Email not verified' });
    return;
  }
  // Check if request is 'POST'
  if (req.method !== 'POST') {
    res.status(405);
    res.json({ error: 'Method not allowed' });
    return;
  }
  try {
    const newActivity = await prisma.activity.create({
      data: {
        name: req.body.name,
        type: req.body.type,
        user: {
          connect: { id: user.id },
        },
      },
    });
  } catch (error) {
    return res.status(500).json({ error: 'Not allowed' });
  }

  return res.json({ message: 'Done' });
});
