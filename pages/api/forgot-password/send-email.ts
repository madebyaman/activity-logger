import type { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuid } from 'uuid';
import { prisma, sendEmail } from 'lib';
import { User } from '@prisma/client';

export default async function forgotPassword(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // If method is not post, throw error
  if (req.method !== 'POST') {
    res.status(405);
    res.json({ error: 'Method not allowed' });
    return;
  }
  // Check if Email is passed to it.
  const { email } = req.body;
  if (!email) {
    res.status(400);
    res.json({ error: 'No email passed' });
  }

  // Check if user exists, then update their password reset string
  let user: User | null = null;
  const currentTime = new Date();
  currentTime.setHours(currentTime.getHours() + 2);
  try {
    user = await prisma.user.update({
      where: {
        email,
      },
      data: {
        verificationString: uuid(),
        passwordResetDeadline: currentTime,
      },
    });
  } catch (e) {
    return res.status(500).json({ error: 'Server error' });
  }

  if (!user) {
    return res.status(401);
  }
  // And send the email with password reset.
  try {
    await sendEmail({
      to: email,
      from: 'Aman Thakur',
      subject: 'Update your password',
      html: `
      <p>We received a request to reset your password. To continue please click the temporary link below within 2 hours: <a href="http://activity-logger.vercel.app/forgot-password/${user.verificationString}">http://activity-logger.vercel.app/forgot-password/${user.verificationString}
    </a></p>
    `,
    });
    return res.status(200).json({ message: 'Email sent successfully' });
  } catch (e) {
    return res.status(500).json({ message: 'Unable to send email' });
  }
}
