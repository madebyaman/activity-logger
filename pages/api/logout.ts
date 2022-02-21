import { NextApiRequest, NextApiResponse } from 'next';

export default function logout(req: NextApiRequest, res: NextApiResponse) {
  // Clear cookie
  res.setHeader(
    'Set-Cookie',
    'ACTIVITY_LOGGER_TOKEN=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT; Secure; HttpOnly'
  );
  res.json({ message: 'Logged out' });
}
