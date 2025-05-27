import { NextResponse } from 'next/server'
import { auth } from '../auth.config'
import createIntlMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

const intlMiddleware = createIntlMiddleware(routing)

export default auth((req: any) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth

  const pathnameHasLocale = routing.locales.some(
    (locale) => nextUrl.pathname.startsWith(`/${locale}/`) || nextUrl.pathname === `/${locale}`
  )

  let pathname = nextUrl.pathname
  if (pathnameHasLocale) {
    pathname = '/' + nextUrl.pathname.split('/').slice(2).join('/')
  }

  const protectedRoutes = ['/student', '/lecturer', '/admin']

  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))

  if (!isLoggedIn && isProtectedRoute) {
    const locale = pathnameHasLocale ? nextUrl.pathname.split('/')[1] : routing.defaultLocale
    return NextResponse.redirect(new URL(`/${locale}`, nextUrl))
  }

  if (isLoggedIn && req.auth?.user?.role === 'admin') {
    const locale = pathnameHasLocale ? nextUrl.pathname.split('/')[1] : routing.defaultLocale
    return NextResponse.redirect(new URL(`/${locale}/admin`, nextUrl))
  }

  if (isLoggedIn && req.auth?.user?.role === 'student') {
    const locale = pathnameHasLocale ? nextUrl.pathname.split('/')[1] : routing.defaultLocale
    return NextResponse.redirect(new URL(`/${locale}/student`, nextUrl))
  }

  if (isLoggedIn && req.auth?.user?.role === 'lecturer') {
    const locale = pathnameHasLocale ? nextUrl.pathname.split('/')[1] : routing.defaultLocale
    return NextResponse.redirect(new URL(`/${locale}/lecturer`, nextUrl))
  }

  return intlMiddleware(req)
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)']
}
