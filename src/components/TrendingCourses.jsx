"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import coursesData from "@/data/courses.json";

export default function TrendingCourses() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
   
    const fetchTrending = () => {
      setTimeout(() => {
        const trending = coursesData.filter(course => course.isTrending);
        setCourses(trending);
        setIsLoading(false);
      }, 500); 
    };

    fetchTrending();
  }, []);

  const handleFullDetailsClick = (courseId) => {
    setSelectedCourse(null); 
    if (status === "unauthenticated") {
      router.push("/login");
    } else {
      router.push(`/courses/${courseId}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          🚀 Trending Courses
        </h2>
        <Link href="/courses" className="text-[#016c45] font-semibold text-[15px] hover:underline hidden sm:block">
          View All
        </Link>
      </div>

      {isLoading ? (
       
        <div className="flex justify-center items-center py-20">
           <svg className="animate-spin h-12 w-12 text-[#016c45]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 flex-grow">
            {courses.slice(0, 4).map((course) => (
              <div key={course.id} className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 flex flex-col">
                <div className="relative h-40 w-full bg-gray-900 p-2">
                  <img src={course.image} alt={course.title} className="w-full h-full object-contain rounded-lg" />
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="font-bold text-[16px] text-gray-900 leading-snug mb-3 line-clamp-2">
                    {course.title}
                  </h3>
                  
                  <div className="flex justify-between items-center text-[13px] text-gray-500 font-medium mb-4">
                    <span>{course.duration} • {course.level}</span>
                    <div className="flex items-center text-yellow-500 font-bold gap-1">
                      ⭐ {course.rating}
                    </div>
                  </div>

                  <button 
                    onClick={() => setSelectedCourse(course)}
                    className="mt-auto w-full py-2 bg-[#016c45] hover:bg-[#015234] text-white text-[14px] font-semibold rounded-lg transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>

         
          <Link href="/courses" className="hidden lg:flex w-12 h-12 shrink-0 bg-[#016c45] hover:bg-[#015234] text-white rounded-full items-center justify-center transition-transform hover:scale-105 shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
          </Link>
        </div>
      )}

     
      {selectedCourse && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setSelectedCourse(null)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            <div className="text-center mb-6">
              <span className="inline-block bg-[#e6f0eb] text-[#016c45] px-3 py-1 rounded-md text-xs font-bold mb-4">Course Preview</span>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{selectedCourse.title}</h3>
              <p className="text-gray-600 leading-relaxed text-[15px]">{selectedCourse.description}</p>
            </div>
            <div className="mt-8 space-y-3">
              <button 
                onClick={() => handleFullDetailsClick(selectedCourse.id)}
                className="w-full py-3.5 bg-gray-900 hover:bg-black text-white text-[15px] font-semibold rounded-xl transition-all shadow-md flex justify-center items-center gap-2"
              >
                Go to Full Details
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
              </button>
              <p className="text-center text-xs text-gray-400 flex items-center justify-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                Requires an account to view curriculum
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 text-center sm:hidden">
        <Link href="/courses" className="inline-block px-6 py-2 border-2 border-[#016c45] text-[#016c45] font-semibold rounded-xl hover:bg-[#e6f0eb] transition-colors">
          View All Trending Courses
        </Link>
      </div>
    </div>
  );
}