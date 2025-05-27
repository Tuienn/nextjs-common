import { auth } from '../../../../auth.config'
import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default async function AuthProvider({ children }: Props) {
  const session = await auth()
  return (
    <SessionProvider basePath='/auth' session={session}>
      {children}
    </SessionProvider>
  )
}
