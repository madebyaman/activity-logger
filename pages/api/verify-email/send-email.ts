import jwt, { JwtPayload } from 'jsonwebtoken';
import { prisma, sendEmail } from 'lib';
import { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuid } from 'uuid';

export default async function resendVerificationEmail(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { ACTIVITY_LOGGER_TOKEN: token } = req.cookies;
  if (!token) {
    return res
      .status(400)
      .json({ message: 'No token found. Try signing in again.' });
  }

  let user; // user is declared. So it remains in the scope of this if.

  try {
    const { id } = jwt.verify(
      token,
      process.env.PRIVATE_KEY || 'string'
    ) as JwtPayload;

    user = await prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      res.status(401);
      res.json({ error: 'User not found' });
      return;
    }
  } catch (e) {
    res.status(401);
    res.json({ error: 'Not authorized' });
    return;
  }

  // Check if email is already verified
  if (user.isVerified) {
    return res.status(200).json({ message: 'verified' });
  }

  const updatedUser = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      verificationString: uuid(),
    },
  });

  try {
    await sendEmail({
      to: updatedUser.email,
      from: 'thakura994@gmail.com',
      subject: 'Please verify your email',
      html: `
      <p>Thanks for signing up! To verify your email, click here: <a href="http://localhost:3000/verify-email/${updatedUser.verificationString}">http://localhost:3000/verify-email/${updatedUser.verificationString}
    </a></p>
    `,
    });

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (e) {
    return res
      .status(500)
      .json({ message: 'Unable to send verification email' });
  }
}
