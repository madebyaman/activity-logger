import { NextRequest, NextResponse } from 'next/server';

const protectedPages = ['/', '/preferences'];

export default function middleware(req: NextRequest) {
  if (protectedPages.find((p) => p === req.nextUrl.pathname)) {
    const token = req.cookies.ACTIVITY_LOGGER_TOKEN;

    if (!token) {
      return NextResponse.redirect('/signin');
    }
  }
}
