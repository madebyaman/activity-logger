import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import prisma from '../../utils/prisma';
import { activitiesData } from '../../utils';
import { User } from '@prisma/client';

export default async function signup(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const salt = bcrypt.genSaltSync();
  const { email, password, firstName, lastName } = req.body;

  let user: User | undefined;
  try {
    user = await prisma.user.create({
      data: {
        email,
        password: bcrypt.hashSync(password, salt),
      },
    });
  } catch (e) {
    res.status(401);
    res.json({ error: 'User already exists' });
    return;
  }

  // Update Profile with first name and last name
  if (!user) {
    return res.status(401).json({ error: 'User already exists' });
  }
  const updateProfile = await prisma.profile.update({
    where: {
      userId: user.id,
    },
    data: {
      firstName,
      lastName,
    },
  });
  const token = jwt.sign(
    {
      email: user?.email,
      time: Date.now(),
      id: user.id,
    },
    process.env.PRIVATE_KEY || 'secret',
    { expiresIn: '8h' }
  );

  res.setHeader(
    'Set-Cookie',
    cookie.serialize('ACTIVITY_LOGGER_TOKEN', token, {
      httpOnly: true,
      maxAge: 8 * 60 * 60,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    })
  );

  // Seed activities
  await Promise.all(
    activitiesData.map((act) => {
      return prisma.activity.create({
        data: {
          name: act.name,
          type: act.type,
          user: {
            connect: { id: user && user.id },
          },
        },
      });
    })
  );

  return res.json(user);
}
