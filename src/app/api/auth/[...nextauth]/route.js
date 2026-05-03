import NextAuth from "next-auth/next";
// ✅ Using the @ shortcut, just like you did for MongoDB!
import { authOptions } from "@/lib/authOptions"; 

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };