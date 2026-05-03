"use client";
import Link from "next/link";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function NotFound() {
  return (
    <div className={`min-h-screen bg-[#f0f9f6] flex items-center justify-center px-4 ${inter.className}`}>
     
      <div className="max-w-6xl w-full bg-white rounded-[40px] shadow-[0_20px_60px_rgba(0,0,0,0.07)] overflow-hidden flex flex-col md:flex-row items-stretch relative border border-white">
       
        <div className="flex-1 p-10 lg:p-20 flex flex-col justify-center z-10">
          <h1 className="text-[120px] font-black text-[#016c45] leading-none mb-2 opacity-90 tracking-tighter">
            404
          </h1>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
            Page Not Found
          </h2>
          <p className="text-[17px] text-gray-500 mb-10 max-w-sm leading-relaxed font-medium">
            Oops! The page you are looking for doesn't exist or has been moved.
          </p>

          <div>
            <Link 
              href="/" 
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#016c45] hover:bg-[#015234] text-white font-bold rounded-2xl transition-all shadow-lg shadow-green-900/20 active:scale-95"
            >
            
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={2.5} 
                stroke="currentColor" 
                className="w-5 h-5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>
              Go Back Home
            </Link>
          </div>
        </div>

        <div className="flex-1 relative min-h-[400px] md:min-h-[600px] bg-[#e3f4ee]">
          <img 
            src="/asset/404.jpeg"
            alt="Page Not Found Astronaut" 
            className="w-full h-full object-cover object-center"
          />
          
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent hidden md:block"></div>
        </div>

      </div>
    </div>
  );
}