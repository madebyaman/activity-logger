import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import { prisma } from 'lib';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function verifyEmail(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { verificationString } = req.body;
  if (!verificationString) {
    return res.status(401).json({ message: 'No verification string' });
  }

  const result = await prisma.user.findUnique({
    where: {
      verificationString,
    },
  });

  if (!result) {
    return res
      .status(401)
      .json({ message: 'The email verification code is incorrect' });
  }

  const verifiedUser = await prisma.user.update({
    where: {
      id: result.id,
    },
    data: {
      isVerified: true,
    },
  });

  const token = jwt.sign(
    {
      email: result.email,
      time: Date.now(),
      id: result.id,
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

  return res.json(result);
}
