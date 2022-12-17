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
    user = await prisma.user.findUnique({
      where: {
        verificationString,
      },
    });
  } catch (e) {
    return res.status(500).json({ message: 'Internal server error' });
  }
  if (!user) {
    return res
      .status(401)
      .json({ message: 'The email verification code is incorrect' });
  }
  // If email verification code is correct, then check if deadline has not passed.
  const currentTime = new Date();
  if (user.passwordResetDeadline && user.passwordResetDeadline > currentTime) {
    const newPassword = await hash(password, salt);
    try {
      const updateUser = await prisma.user.update({
        where: {
          email: user.email,
        },
        data: {
          password: newPassword,
        },
        select: {
          email: true,
        },
      });
      return res.status(200).json({ email: updateUser.email });
    } catch (e) {
      return res.status(500).json({ error: 'Internal error' });
    }
  } else {
    return res.status(400).json({ error: 'Try resending the email' });
  }
}
