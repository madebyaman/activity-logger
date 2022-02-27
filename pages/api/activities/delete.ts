import { validateRoute } from '../../../utils';
import prisma from '../../../utils/prisma';

export default validateRoute(async (req, res, user) => {
  try {
    const deletedActivity = await prisma.activity.delete({
      where: { id: req.body.id },
    });
    return res.status(200).json(deletedActivity);
  } catch (e) {
    return res.status(400).json({ error: 'Activity not found' });
  }
});
