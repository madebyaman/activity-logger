import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import prisma from '../../utils/prisma';

export default async function signin(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (user && bcrypt.compareSync(password, user.password)) {
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
  res.status(401);
  res.json({ error: "User doesn't exist" });
}
