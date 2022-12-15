import { NextApiRequestCookies } from 'next/dist/server/api-utils';
import { NextRequest, NextResponse } from 'next/server';

type CustomCookies = NextApiRequestCookies & {
  ACTIVITY_LOGGER_TOKEN: string;
};

export function middleware(req: NextRequest & { cookies: CustomCookies }) {
  const token = req.cookies.get('ACTIVITY_LOGGER_TOKEN');

  if (!token) {
    return NextResponse.redirect(new URL('/signin', req.url));
  }
}

export const config = {
  matcher: ['/dashboard', '/preferences', '/activities', '/reports'],
};
