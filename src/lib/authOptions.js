import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials;
        try {
          await connectMongoDB();
          const user = await User.findOne({ email });

          if (!user) return null; 
          if (!user.password) return null; 

          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (!passwordsMatch) return null; 

          return user; 
        } catch (error) {
          console.log("Error: ", error);
          return null;
        }
      },
    }),
  ],
  
  callbacks: {
  
    async jwt({ token, user, trigger, session }) {
     
      if (user) {
        token.image = user.image;
        token.name = user.name; 
      }
    
      if (trigger === "update" && session) {
        token.image = session.image;
        token.name = session.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.image = token.image;
        session.user.name = token.name;
      }
      return session;
    }
  },

  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  pages: { signIn: "/login" },
};