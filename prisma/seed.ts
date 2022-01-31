import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import initialState, { getDateString } from '../utils/initialState';
import { activitiesData } from './activitiesData';

const prisma = new PrismaClient();

const run = async () => {
  // First seed all activities
  // await Promise.all(
  //   activitiesData.map(async (activity) => {
  //     return prisma.activity.upsert({
  //       where: { userEmail: 'user@test.com' },
  //       update: {},
  //       create: {
  //         name: activity.name,
  //         type: activity.type,
  //         userEmail: 'user@test.com',
  //       },
  //     });
  //   })
  // );

  // Put User
  const salt = bcrypt.genSaltSync();
  const user = await prisma.user.upsert({
    where: { email: 'user@test.com' },
    update: {},
    create: {
      email: 'user@test.com',
      password: bcrypt.hashSync('password', salt),
    },
  });

  // Put Activities
  const activities = await prisma.activity.findMany({});
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
  const logs = await prisma.dailyLog.upsert({
    where: { date: getDateString() },
    update: {},
    create: {
      date: getDateString(),
      user: {
        connect: { id: user.id },
      },
      Log: {
        create: initialState(profile.noOfBlocksPerHour).map((log) => {
          return {
            from: log.from,
            to: log.to,
            hour: log.hour,
          };
        }),
      },
    },
  });
};

run()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
