import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { activitiesData } from './activitiesData';

const prisma = new PrismaClient();

const run = async () => {
  // First seed all activities
  // await Promise.all(
  //   activitiesData.map(async (activity) => {
  //     return prisma.activity.upsert({
  //       where: { /* userId matches current userId */},
  //       update: {},
  //       create: {
  //         name: activity.name,
  //         type: activity.type,
  //         userId: user
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
};

run()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
