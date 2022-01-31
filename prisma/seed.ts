import bcrypt from 'bcrypt';
import { env } from 'process';
import initialState, { getDateString } from '../utils/initialState';
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

  // Create User Profile with noOfBlocksPerHour, Sleep timing etc.
  const profile = await prisma.profile.upsert({
    where: { userId: user.id },
    update: {},
    create: {
      noOfBlocksPerHour: 4,
      sleepFrom: 22,
      sleepTo: 6,
      user: {
        connect: { id: user.id },
      },
    },
  });

  // Put Logs for today
  const date = getDateString();
  // Put logs for today, ONLY IF there are no logs for today
  const logs = await prisma.log.findMany({ where: { date: date } });
  if (!logs.length) {
    await Promise.all(
      initialState().map(({ from, to, hour }) => {
        return prisma.log.create({
          data: {
            from,
            hour,
            to,
            date,
            user: {
              connect: { id: user.id },
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
