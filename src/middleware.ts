import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['en', 'ar'];
const defaultLocale = 'en';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip non-frontend routes and static files
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/admin') ||
    pathname.match(/\.(ico|jpg|jpeg|png|gif|svg|css|js)$/)
  ) {
    return NextResponse.next();
  }

  // Redirect root to default locale
  if (pathname === '/') {
    return NextResponse.redirect(new URL(`/${defaultLocale}`, request.url));
  }

  // Get the locale from the pathname
  const pathnameParts = pathname.split('/');
  const pathnameLocale = pathnameParts[1];

  // If the pathname doesn't start with a locale, redirect
  if (!locales.includes(pathnameLocale)) {
    const locale = request.cookies.get('NEXT_LOCALE')?.value || defaultLocale;
    return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
  }

  const response = NextResponse.next();
  response.cookies.set('NEXT_LOCALE', pathnameLocale);
  return response;
}

export const config = {
  matcher: ['/((?!api|_next|admin|assets|favicon.ico).*)']
}
