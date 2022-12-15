import { validateRoute, prisma } from '../../../lib';

export default validateRoute(async (req, res, user) => {
  // If method is not post, throw error
  if (req.method !== 'POST') {
    res.status(405);
    res.json({ error: 'Method not allowed' });
    return;
  }

  try {
    const updateActivity = await prisma.activity.update({
      where: { id: req.body.id },
      data: {
        name: req.body.name,
        type: req.body.type,
      },
    });

    return res.json(updateActivity);
  } catch (e) {
    // If no activity is found, prisma throws an exception 'RecordNotFound'
    // https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#update
    return res.status(400).json({ error: 'Activity not found' });
  }
});
