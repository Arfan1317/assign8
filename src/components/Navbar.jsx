"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (pathname === "/login" || pathname === "/register") {
    return null;
  }

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Courses", path: "/courses" },
    { name: "My Profile", path: "/profile" },
  ];

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-md border-b border-gray-200/50 shadow-[0_4px_30px_rgba(0,0,0,0.03)] transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-2" onClick={closeMenu}>
            <img src="/asset/logofooter.png" alt="SkillSphere Logo" className="w-8 h-8 rounded-md" />
            <span className="text-xl font-bold text-gray-900 tracking-tight">SkillSphere</span>
          </Link>

          {/* Center Link*/}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.path}
                className={`text-[15px] font-semibold transition-colors ${
                  pathname === link.path 
                    ? "text-[#016c45]" 
                    : "text-gray-600 hover:text-[#016c45]"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Auth Section */}
          <div className="hidden md:flex items-center gap-4">
            <button className="text-gray-600 hover:text-[#016c45] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </button>

            {/* Handle the Loading Glitch */}
            {status === "loading" ? (
               <div className="flex items-center gap-4 pl-4 border-l border-gray-200">
                  <div className="w-9 h-9 rounded-full bg-gray-200 animate-pulse"></div>
                  <div className="w-16 h-5 rounded bg-gray-200 animate-pulse"></div>
               </div>
            ) : session?.user ? (
              <div className="flex items-center gap-4 pl-4 border-l border-gray-200">
                <img 
                  src={session.user.image || "https://ui-avatars.com/api/?name=" + session.user.name} 
                  alt="Avatar" 
                  className="w-9 h-9 rounded-full border-2 border-[#016c45] object-cover"
                />
                <button 
                  onClick={() => signOut()}
                  className="text-[14px] font-semibold text-red-500 hover:text-red-700 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                <Link href="/login" className="px-5 py-2 text-[15px] font-semibold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 rounded-xl transition-all">
                  Login
                </Link>
                <Link href="/register" className="px-5 py-2 text-[15px] font-semibold text-white bg-[#016c45] hover:bg-[#015234] rounded-xl transition-all shadow-sm">
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Hamburger Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <button className="text-gray-600 hover:text-[#016c45] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </button>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                {isMobileMenuOpen ? (
                   <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /> // Close Icon
                ) : (
                   <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /> // Hamburger Icon
                )}
              </svg>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-gray-200 px-4 pt-2 pb-6 space-y-4 shadow-lg">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.path}
                onClick={closeMenu}
                className={`px-4 py-3 rounded-xl text-[16px] font-semibold transition-colors ${
                  pathname === link.path 
                    ? "bg-[#016c45]/10 text-[#016c45]" 
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-4 border-t border-gray-100">
            {status === "loading" ? (
               <div className="flex items-center gap-3 px-4">
                  <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
                  <div className="w-20 h-5 rounded bg-gray-200 animate-pulse"></div>
               </div>
            ) : session?.user ? (
              <div className="flex items-center justify-between px-4">
                <div className="flex items-center gap-3">
                  <img 
                    src={session.user.image || "https://ui-avatars.com/api/?name=" + session.user.name} 
                    alt="Avatar" 
                    className="w-10 h-10 rounded-full border-2 border-[#016c45] object-cover"
                  />
                  <span className="font-semibold text-gray-900 truncate max-w-[120px]">{session.user.name}</span>
                </div>
                <button 
                  onClick={() => { signOut(); closeMenu(); }}
                  className="px-4 py-2 text-[14px] font-semibold text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3 px-2">
                <Link href="/login" onClick={closeMenu} className="w-full py-3 text-center text-[15px] font-semibold text-gray-700 bg-gray-50 border border-gray-200 rounded-xl transition-colors">
                  Login
                </Link>
                <Link href="/register" onClick={closeMenu} className="w-full py-3 text-center text-[15px] font-semibold text-white bg-[#016c45] hover:bg-[#015234] rounded-xl transition-colors">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}