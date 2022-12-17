import { Activity, Log, User } from '@prisma/client';
import { differenceInMinutes } from 'date-fns';
import { prisma, validateRoute } from 'lib';
import { NextApiRequest, NextApiResponse } from 'next';
import { Report } from 'types';

async function mapLogsWithActivities(
  a: Promise<Report[]>,
  b: Log
): Promise<Report[]> {
  const initial = await a;
  let itemFound = false;
  initial.forEach((item) => {
    if (item.activityId === b.activityId) {
      itemFound = true;
      item.totalMinutes += differenceInMinutes(b.to, b.from);
    }
  });

  if (!itemFound && b.activityId) {
    try {
      const activity = await new Promise<Activity>(async (resolve, reject) => {
        if (!b.activityId) {
          reject();
        } else {
          const activity = await prisma.activity.findUnique({
            where: { id: b.activityId },
          });
          if (!activity) {
            reject();
          } else {
            resolve(activity);
          }
        }
      });
      const newItem: Report = {
        activityId: activity.id,
        activityName: activity.name,
        activityType: activity.type,
        totalMinutes: differenceInMinutes(b.to, b.from),
      };
      initial.push(newItem);
      return initial;
    } catch (e) {
      return initial;
    }
  } else {
    return initial;
  }
}

/**
 * Calls `validateRoute` function and returns todays logs or [] if not found
 */
const getLogsReport = async (
  req: NextApiRequest,
  res: NextApiResponse,
  user: User
) => {
  // If method is not post, throw error
  if (req.method !== 'POST') {
    res.status(405);
    res.json({ error: 'Method not allowed' });
    return;
  }
  // If no `to` passed, return early
  const { to } = req.body;
  const toDate = new Date(to);
  const fromDate = new Date(req.body.from) || new Date();
  if (!to || Number.isNaN(toDate.getTime())) {
    return res.status(400).json({ error: 'Data not passed' });
  }

  const logs = await prisma.log.findMany({
    where: {
      AND: [
        {
          userId: user.id,
        },
        {
          from: {
            lt: fromDate,
          },
        },
        {
          to: {
            gt: toDate,
          },
        },
      ],
    },
  });

  const generatedReports = await logs.reduce(
    mapLogsWithActivities,
    Promise.resolve([])
  );
  return res.status(200).json(generatedReports);
};

export default validateRoute(getLogsReport);
