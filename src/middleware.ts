import { NextRequest, NextResponse } from 'next/server'
import { getSession } from './lib/auth/session'

const protectedRoutes = ['/dashboard']
const publicRoutes = ['/auth/sign-in', '/auth/sign-up']

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path)
  const isPublicRoute = publicRoutes.includes(path)

  // const session = await getSession()

  // if (isProtectedRoute && !session?.id) {
  //   return NextResponse.redirect(new URL('/auth/sign-in', req.nextUrl))
  // }

  // if (isPublicRoute && session?.id && !path.startsWith('/dashboard')) {
  //   return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
  // }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)']
}
