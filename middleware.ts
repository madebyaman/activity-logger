// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextRequest, NextResponse } from 'next/server';

type CustomCookies = {
  ACTIVITY_LOGGER_TOKEN: string;
};

export function middleware(req: NextRequest & { cookies: CustomCookies }) {
  const token = req.cookies.ACTIVITY_LOGGER_TOKEN;

  if (!token) {
    return NextResponse.redirect(new URL('/signin', req.url));
  }
}

export const config = {
  // matcher: ['/dashboard', '/preferences', '/activities'],
  matcher: [],
};
