import type { NextApiRequest, NextApiResponse } from 'next';
import { hash, genSalt } from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import { v4 as uuid } from 'uuid';
import { prisma, sendEmail } from 'lib';
import { User } from '@prisma/client';

export default async function signup(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const salt = await genSalt();
  const { email, password, firstName, lastName } = req.body;

  let user: User | undefined;
  const verificationString = uuid();

  try {
    const passwordHash = await hash(password, salt);
    user = await prisma.user.create({
      data: {
        email: email,
        password: passwordHash,
        isVerified: false,
        verificationString,
      },
    });
  } catch (e) {
    res.status(401);
    res.json({ error: 'User already exists' });
    return;
  }

  try {
    await sendEmail({
      to: email,
      from: 'amanthakur95@gmail.com',
      subject: 'Please verify your email',
      text: `
      Thanks fro signing up! To verify your email, click here: http://localhost:3000/verify-email/${verificationString}
    `,
    });
  } catch (e) {
    return res
      .status(500)
      .json({ message: 'Unable to send verification email' });
  }

  // Update Profile with first name and last name
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
