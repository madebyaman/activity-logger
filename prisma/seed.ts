import bcrypt from 'bcrypt';
import { env } from 'process';
import initialState from '../utils/initialState';
import { getDateString } from '../utils/getDateString';
import { activitiesData } from './activitiesData';
import prisma from '../utils/prisma';

const run = async () => {
  if (!env['TEST_EMAIL'] || !env['TEST_PASSWORD']) {
    console.error('No test email, password in env file');
    return;
  }
  // Put User
  const salt = bcrypt.genSaltSync();
  const user = await prisma.user.upsert({
    where: { email: env['TEST_EMAIL'] },
    update: {},
    create: {
      email: env['TEST_EMAIL'],
      password: bcrypt.hashSync(env['TEST_PASSWORD'], salt),
    },
  });

  // Put Activities
  const activities = await prisma.activity.findMany({
    where: { userId: user.id },
  });
  if (!activities.length) {
    await Promise.all(
      activitiesData.map((act) => {
        return prisma.activity.create({
          data: {
            name: act.name,
            type: act.type,
            user: {
              connect: { id: user.id },
            },
          },
        });
      })
    );
  }

  // Create User Profile with Sleep timing
  const profile = await prisma.profile.upsert({
    where: { userId: user.id },
    update: {},
    create: {
      sleepFrom: 22,
      sleepTo: 6,
      user: {
        connect: { id: user.id },
      },
    },
  });

  // Put Logs for today
  const date = getDateString();
  // Find today's logs
  const todaysLog = await prisma.dailyLog.upsert({
    where: { date: date },
    update: {},
    create: {
      date,
      user: {
        connect: { id: user.id },
      },
      blocksPerHour: 4,
    },
  });

  const logs = await prisma.log.findMany({ where: { dailyLogId: date } });
  if (!logs.length) {
    await Promise.all(
      initialState().map(({ from, to, hour }) => {
        return prisma.log.create({
          data: {
            from,
            hour,
            to,
            User: {
              connect: { id: user.id },
            },
            DailyLog: {
              connect: { date: todaysLog.date },
            },
          },
        });
      })
    );
  }
};

run()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
