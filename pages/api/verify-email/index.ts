import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import { prisma } from 'lib';
import { NextApiRequest, NextApiResponse } from 'next';
import { User } from '@prisma/client';

export default async function verifyEmail(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'PUT') {
    res.status(405);
    res.json({ error: 'Method not allowed' });
    return;
  }
  const { verificationString } = req.body;
  if (!verificationString) {
    return res.status(400).json({ message: 'No verification string' });
  }

  let user: User | null = null;
  try {
    user = await prisma.user.update({
      where: {
        verificationString,
      },
      data: {
        isVerified: true,
      },
    });
  } catch (e) {
    return res
      .status(401)
      .json({ message: 'The email verification code is incorrect' });
  }
  if (!user) {
    return res
      .status(401)
      .json({ message: 'The email verification code is incorrect' });
  }

  const token = jwt.sign(
    {
      email: user.email,
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

  return res.json({ email: user.email });
}
