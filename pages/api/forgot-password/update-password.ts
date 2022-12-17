import { User } from '@prisma/client';
import { genSalt, hash } from 'bcrypt';
import { prisma } from 'lib';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function updatePassword(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'PUT') {
    res.status(405);
    res.json({ error: 'Method not allowed' });
    return;
  }
  const { verificationString, password } = req.body;
  if (!verificationString || !password) {
    return res.status(400).json({ message: 'No verification string' });
  }

  let user: User | null = null;
  const salt = await genSalt();
  try {
    user = await prisma.user.update({
      where: {
        verificationString,
      },
      data: {
        password: await hash(password, salt),
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

  return res.status(200).json({ email: user.email });
}
