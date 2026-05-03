"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import coursesData from "@/data/courses.json"; 
export default function PopularCourses() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState(null); 

  
  useEffect(() => {
    const fetchCourses = () => {
     
      setTimeout(() => {
        
        const popular = coursesData.filter(course => course.isPopular);
        setCourses(popular);
        setIsLoading(false);
      }, 1500);
    };

    fetchCourses();
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      
      
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          🔥 Popular Courses
        </h2>
        <button className="text-[#016c45] font-semibold text-[15px] hover:underline">
          View All
        </button>
      </div>

      
      {isLoading ? (
        
        <div className="flex justify-center items-center py-20">
          <svg className="animate-spin h-12 w-12 text-[#016c45]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      ) : (
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div key={course.id} className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 flex flex-col transition-transform hover:-translate-y-1">
              
              {/* Image & Badge */}
              <div className="relative h-48 w-full bg-gray-100">
                <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                <span className="absolute top-4 left-4 bg-[#016c45] text-white text-[12px] font-semibold px-3 py-1 rounded-md">
                  {course.category}
                </span>
              </div>

              {/* Card Content */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="font-bold text-[18px] text-gray-900 leading-snug mb-2 line-clamp-2">
                  {course.title}
                </h3>
                
                <div className="flex justify-between items-center mb-4 text-sm">
                  <span className="text-gray-500 font-medium">{course.instructor.name}</span>
                  <div className="flex items-center text-yellow-500 font-semibold gap-1">
                    ⭐ {course.rating} <span className="text-gray-400 font-normal">({course.reviews})</span>
                  </div>
                </div>

                <div className="flex justify-between items-center text-[13px] text-gray-500 font-medium mb-6">
                  <div className="flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    {course.duration}
                  </div>
                  <span>{course.level}</span>
                </div>

                
                <button 
                  onClick={() => setSelectedCourse(course)}
                  className="mt-auto w-full py-2.5 bg-[#016c45] hover:bg-[#015234] text-white text-[15px] font-semibold rounded-xl transition-colors"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      
      <div className="mt-16 bg-[#fffaf0] rounded-3xl p-8 lg:p-10 border border-orange-100 shadow-sm">
        <h3 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          ⭐ Learning Tips
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:divide-x md:divide-orange-200/60">
          
          <div className="flex items-start gap-4 md:px-4">
            <div className="w-12 h-12 shrink-0 bg-white border border-green-100 rounded-full flex items-center justify-center text-[#016c45]">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-1">Stay Consistent</h4>
              <p className="text-sm text-gray-600 font-medium">Study a little every day to make big progress.</p>
            </div>
          </div>

          <div className="flex items-start gap-4 md:px-8">
            <div className="w-12 h-12 shrink-0 bg-white border border-green-100 rounded-full flex items-center justify-center text-[#016c45]">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-1">Manage Your Time</h4>
              <p className="text-sm text-gray-600 font-medium">Use a schedule and stick to it.</p>
            </div>
          </div>

          <div className="flex items-start gap-4 md:px-8">
            <div className="w-12 h-12 shrink-0 bg-white border border-green-100 rounded-full flex items-center justify-center text-[#016c45]">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-1">Active Practice</h4>
              <p className="text-sm text-gray-600 font-medium">Practice regularly makes perfect.</p>
            </div>
          </div>

        </div>
      </div>

      
      {selectedCourse && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative animate-in fade-in zoom-in duration-200">
            
            {/* Close Button */}
            <button 
              onClick={() => setSelectedCourse(null)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>

            {/* Modal Content */}
            <div className="text-center mb-6">
              <span className="inline-block bg-[#e6f0eb] text-[#016c45] px-3 py-1 rounded-md text-xs font-bold mb-4">
                Course Preview
              </span>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{selectedCourse.title}</h3>
              <p className="text-gray-600 leading-relaxed text-[15px]">
                {selectedCourse.description}
              </p>
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

    </div>
  );
}