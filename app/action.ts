'use server'

import { fetcher } from "@/lib/utils";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const   submitEmail= async (formData: FormData)=>{
 const email = formData.get('email')
 // TODO: Call api to subscribe email
}

export async function googleLogin(credential: string) {
  const token = await fetcher<LoginToken>('google-auth', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ credential }),
  });
  const cookieStore = await cookies();
  cookieStore.set('Authentication', token.accessTokenCookie.token, {
      httpOnly: true,
      path: '/',
      maxAge: token.accessTokenCookie.accessTime,
  });
  cookieStore.set('Refresh', token.refreshTokenCookie.token, {
      httpOnly: true,
      path: '/',
      maxAge: token.refreshTokenCookie.accessTime,
  });
  redirect('/');
}