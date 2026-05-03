"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20">
      
      {/* Hero Section Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
        
        {/* Left Content */}
        <div className="max-w-xl">
          <h1 className="text-[3.5rem] leading-[1.1] font-extrabold text-gray-900 mb-6 tracking-tight">
            Upgrade Your <span className="text-[#016c45]">Skills</span><br />
            Today. Tomorrow. Always.
          </h1>
          <p className="text-[1.1rem] text-gray-600 mb-8 leading-relaxed font-medium">
            Learn from industry experts and build in-demand skills that accelerate your career.
          </p>
          
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/courses" className="px-8 py-3.5 bg-[#016c45] hover:bg-[#015234] text-white text-[15px] font-bold rounded-xl shadow-[0_8px_20px_rgba(1,108,69,0.25)] transition-all">
              Explore Courses
            </Link>
            <button className="px-8 py-3.5 bg-white text-gray-800 border border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-[15px] font-bold rounded-xl flex items-center gap-2 transition-all shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#016c45]">
                <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
              </svg>
              Watch Demo
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative">
          <img 
            src="/asset/banner.jpeg" 
            alt="Student Learning" 
            className="w-full h-auto object-contain z-10 relative drop-shadow-2xl"
          />
        </div>
      </div>

      {/* Stats Banner */}
      <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-gray-100">
          
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-12 bg-[#e6f0eb] rounded-full flex items-center justify-center text-[#016c45]">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                <AnimatedNumber end={10} suffix="K+" />
              </h3>
              <p className="text-sm font-medium text-gray-500">Learners</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-12 bg-[#e6f0eb] rounded-full flex items-center justify-center text-[#016c45]">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" /></svg>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                <AnimatedNumber end={200} suffix="+" />
              </h3>
              <p className="text-sm font-medium text-gray-500">Courses</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-12 bg-[#e6f0eb] rounded-full flex items-center justify-center text-[#016c45]">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                <AnimatedNumber end={50} suffix="+" />
              </h3>
              <p className="text-sm font-medium text-gray-500">Instructors</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-12 bg-[#fff8e6] rounded-full flex items-center justify-center text-[#ffc107]">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" /></svg>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">4.8</h3>
              <p className="text-sm font-medium text-gray-500">Average Rating</p>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}

// Custom Smooth Counter Component
function AnimatedNumber({ end, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let isMounted = true;
    let startTimestamp = null;
    let animationFrame;

    const animate = (timestamp) => {
      // If the user leaves the page mid-animation, stop calculating
      if (!isMounted) return; 
      
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Easing function for a natural slow-down effect at the end
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      
      setCount(Math.floor(easeProgress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end); // Lock exactly onto the final number to prevent 0
      }
    };

    // A tiny delay gives Next.js time to finish its route transition
    // before the browser tries to calculate the animation frames.
    const timeoutId = setTimeout(() => {
      animationFrame = requestAnimationFrame(animate);
    }, 50);

    // Cleanup function to reset everything when leaving the page
    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [end, duration]);

  return (
    <span>
      {count}{suffix}
    </span>
  );
}