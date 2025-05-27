import { AuthUser } from './common'

declare module 'next-auth' {
  interface Session {
    user: AuthUser
    accessToken: string
  }

  interface User extends AuthUser {}
}

declare module 'next-auth/jwt' {
  interface JWT extends AuthUser {
    exp: number
    accessToken: string
  }
}
