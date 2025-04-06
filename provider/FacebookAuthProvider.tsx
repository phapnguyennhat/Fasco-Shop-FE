'use client'

import { FacebookProvider  } from 'react-facebook';

export default function FacebookAuthProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <FacebookProvider appId={process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID!}>
      {children}
    </FacebookProvider>
  )
}