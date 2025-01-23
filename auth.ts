import NextAuth from "next-auth"
import GoogleProvider from 'next-auth/providers/google'
import Facebook from 'next-auth/providers/facebook'
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    }),
    Facebook({
      clientId: process.env.FACEBOOKE_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    })
    
  ],
  callbacks: {
    async jwt({ token, account }) {
      // Nếu user đăng nhập bằng Google, lưu accessToken từ Google vào token
      return token;
    },  
   
  },
  secret: process.env.NEXTAUTH_SECRET,
})