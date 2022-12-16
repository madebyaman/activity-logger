import type { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuid } from 'uuid';
import { prisma } from 'lib';

export default async function signin(
  req: NextApiRequest,
  res: NextApiResponse
) {}
