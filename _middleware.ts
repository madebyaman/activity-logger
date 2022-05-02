import { NextRequest, NextResponse } from 'next/server';

const protectedPages = ['/dashboard', '/preferences', '/activities'];

type CustomCookies = {
  ACTIVITY_LOGGER_TOKEN: string;
};

export default function middleware(
  req: NextRequest & { cookies: CustomCookies }
) {
  if (protectedPages.find((p) => p === req.nextUrl.pathname)) {
    const token = req.cookies.ACTIVITY_LOGGER_TOKEN;

    if (!token) {
      return NextResponse.redirect('/signin');
    }
  }
}
