import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
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

  const salt = bcrypt.genSaltSync();
  const user = await prisma.user.upsert({
    where: { email: 'user@test.com' },
    update: {},
    create: {
      email: 'user@test.com',
      password: bcrypt.hashSync('password', salt),
    },
  });

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
};

run()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
