import "./globals.css";
import Navbar from "@/components/Navbar";
import AuthProvider from "@/components/AuthProvider";
import Footer from "@/components/Footer";
import { ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 

export const metadata = {
  title: "SkillSphere",
  description: "Upgrade Your Skills Today",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="skillspheretheme">
      <body className="bg-[#f4fcf8] text-gray-900 antialiased flex flex-col min-h-screen">
        <AuthProvider>
          
          <Navbar />
          <ToastContainer position="bottom-right" autoClose={3000} theme="colored" />
          
          <main className="pt-20 flex-grow">
            {children}
          </main>

          <Footer />
          
        </AuthProvider>
      </body>
    </html>
  );
}