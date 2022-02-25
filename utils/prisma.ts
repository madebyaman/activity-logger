import { PrismaClient } from '@prisma/client';

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

let prisma;
if (typeof window === 'undefined') {
  prisma = global.prisma || new PrismaClient({ log: ['query'] });
}

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;
export default prisma;
