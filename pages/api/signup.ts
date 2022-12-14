import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import prisma from '../../utils/prisma';
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
    console.log(user);
  } catch (e) {
    res.status(401);
    res.json({ error: 'User already exists' });
    return;
  }

  // Update Profile with first name and last name
  if (!user) {
    return res.status(401).json({ error: 'User already exists' });
  }
  await prisma.profile.upsert({
    where: {
      userId: user.id,
    },
    update: {
      firstName,
      lastName,
    },
    create: {
      firstName,
      lastName,
      sleepFrom: 22,
      sleepTo: 6,
      blocksPerHour: 4,
      user: {
        connect: { id: user.id },
      },
    },
  });

  // Create token and cookies
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

  return res.json(user);
}
