import { validateRoute } from '../../../utils';
import prisma from '../../../prisma';

/**
 * Calls `validateRoute` function and return activities[] or error.
 */
export default validateRoute(async (req, res, user) => {
  // Check if request is 'POST'
  if (req.method !== 'POST') {
    res.status(405);
    res.json({ error: 'Method not allowed' });
    return;
  }
  const newActivity = await prisma.activity.create({
    data: {
      name: req.body.name,
      type: req.body.type,
      user: {
        connect: { id: user.id },
      },
    },
  });

  return res.json(newActivity);
});
