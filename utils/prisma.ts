import { PrismaClient } from '@prisma/client';

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

let prisma: any;
if (typeof window === 'undefined') {
  prisma = global.prisma || new PrismaClient();
  if (process.env.NODE_ENV !== 'production') global.prisma = prisma;
}

export default prisma;
