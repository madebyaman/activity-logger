import bcrypt from 'bcrypt';
import { env } from 'process';
import { v4 as uuid } from 'uuid';
import { activitiesData } from '../utils';
import { prisma } from '../lib/prisma';

const run = async () => {
  if (!env['TEST_EMAIL'] || !env['TEST_PASSWORD']) {
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
      verificationString: uuid(),
      isVerified: true,
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
      blocksPerHour: 4,
      firstName: 'Aman',
      lastName: 'Thakur',
      user: {
        connect: { id: user.id },
      },
    },
  });
};

run()
  .catch((e) => {
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
