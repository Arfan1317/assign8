"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Inter } from "next/font/google";
import { toast } from "react-toastify";
import { useParams, useRouter } from "next/navigation";
import coursesData from "@/data/courses.json";

const inter = Inter({ subsets: ["latin"] });

export default function CourseDetailsPage() {
  const params = useParams();
  const router = useRouter();
  
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (params?.id) setIsLoading(false);
  }, [params]);

  if (isLoading) return <div className="min-h-screen bg-white"></div>;

  const course = coursesData.find((c) => c.id === params.id);

  if (!course) {
    return (
      <div className={`min-h-screen pt-32 text-center bg-white ${inter.className}`}>
        <h1 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">Course Not Found!</h1>
        <Link href="/courses" className="text-[#016c45] font-semibold hover:underline">
          Go back to all courses
        </Link>
      </div>
    );
  }

  const handleEnroll = () => {
    setIsEnrolled(true);
    toast.success(`Success! Enrolled in ${course.title}. Check your profile for access.`);
  
  };

  return (
    <div className={`min-h-screen bg-white text-gray-900 antialiased ${inter.className}`}>
      
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center">
          <div className="flex items-center gap-2 text-[15px] font-semibold">
            <Link href="/courses" className="text-[#016c45] hover:text-[#015234] flex items-center gap-1.5 transition-colors">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
               All Courses
            </Link>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
            <span className="text-[#016c45]">{course.category}</span>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
            <span className="text-gray-500 truncate max-w-[150px] sm:max-w-xs">{course.title}</span>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-24">
        
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16">
          
          <div className="space-y-10">
            
            <div className="relative w-full aspect-video bg-gray-900 rounded-3xl overflow-hidden shadow-lg group">
              <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
              <button className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-gray-900 hover:scale-105 transition-transform shadow-xl">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 ml-1">
                    <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                  </svg>
                </div>
              </button>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">About this course</h3>
              <p className="text-[16px] text-gray-600 leading-relaxed">
                {course.about}
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Course Curriculum</h3>
              <div className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                {course.curriculum.map((chapter, index) => (
                  <div key={chapter.id} className={`w-full flex justify-between items-center px-6 py-4 bg-white ${index !== course.curriculum.length - 1 ? 'border-b border-gray-100' : ''}`}>
                    <div className="flex items-center gap-4">
                      <span className="w-8 h-8 rounded-full bg-[#e6f0eb] text-[#016c45] flex items-center justify-center font-bold text-sm">
                        {chapter.id}
                      </span>
                      <span className="font-semibold text-gray-900 text-[15px]">{chapter.title}</span>
                    </div>
                    <div className="flex items-center gap-4 text-gray-400 font-medium text-[14px]">
                      <span>{chapter.lessons}</span>
                      
                      {isEnrolled ? (
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      ) : chapter.isLocked ? (
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                      ) : (
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"></path></svg>
                      )}
                      
                      <svg className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                  </div>
                ))}
              </div>
              
              {!isEnrolled && (
                <div className="mt-6 flex items-center justify-center gap-2 text-[14px] font-semibold text-gray-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                  Please login to enroll in this course.
                </div>
              )}
            </div>
          </div>

          <div className="space-y-8">
    
            <div>
              <h1 className="text-[2.2rem] lg:text-[2.5rem] font-extrabold text-gray-900 leading-[1.15] mb-6">
                {course.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 mb-4">
                <img src={course.instructor.image} alt={course.instructor.name} className="w-10 h-10 rounded-full object-cover" />
                <span className="font-bold text-gray-900 text-[17px]">{course.instructor.name}</span>
                <span className="bg-[#e6f0eb] text-[#016c45] px-3 py-1 rounded-full text-xs font-bold">Instructor</span>
              </div>

              <div className="flex items-center gap-1.5 text-yellow-500 mb-8">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  ))}
                </div>
                <span className="text-gray-900 font-bold ml-1">{course.rating}</span>
                <span className="text-gray-500 font-medium">({course.reviews})</span>
              </div>

              <div className="grid grid-cols-3 gap-4 border-t border-b border-gray-100 py-6">
                <div>
                  <div className="flex items-center gap-1.5 text-gray-900 font-bold mb-1">
                    <svg className="w-5 h-5 text-[#016c45]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    {course.duration}
                  </div>
                  <div className="text-gray-500 text-sm font-medium">Duration</div>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-gray-900 font-bold mb-1">
                    <svg className="w-5 h-5 text-[#016c45]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                    {course.level}
                  </div>
                  <div className="text-gray-500 text-sm font-medium">Level</div>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-gray-900 font-bold mb-1">
                    <svg className="w-5 h-5 text-[#016c45]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a2 2 0 00-1.96 1.414l-.722 2.167a2 2 0 01-1.96 1.414h-2.167a2 2 0 01-1.96-1.414l-.722-2.167a2 2 0 00-1.96-1.414l-2.387.477a2 2 0 00-1.022.547l-1.167 1.167a2 2 0 01-1.96-1.414l-.722-2.167a2 2 0 01-1.96-1.414h-2.167a2 2 0 01-1.96-1.414l-.722-2.167z"></path></svg>
                    {course.category}
                  </div>
                  <div className="text-gray-500 text-sm font-medium">Category</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              <div className="flex items-end gap-3 mb-6">
                <span className="text-4xl font-extrabold text-[#016c45]">${course.price}</span>
                <span className="text-lg text-gray-400 line-through mb-1">${course.originalPrice}</span>
                <span className="bg-[#e6f0eb] text-[#016c45] px-2.5 py-1 rounded-md text-xs font-bold mb-1.5 ml-auto">{course.discount}</span>
              </div>

              <ul className="space-y-3.5 mb-8 text-[15px] font-medium text-gray-700">
                {course.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-[#016c45] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                    {feature}
                  </li>
                ))}
              </ul>

              {isEnrolled ? (
                <button type="button" disabled className="w-full py-3.5 bg-gray-100 text-gray-500 font-bold rounded-xl text-[16px] cursor-not-allowed">
                  Enrolled
                </button>
              ) : (
                <button type="button" onClick={handleEnroll} className="w-full py-3.5 bg-[#016c45] hover:bg-[#015234] text-white font-bold rounded-xl text-[16px] transition-colors shadow-md">
                  Enroll Now
                </button>
              )}
            </div>

            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)] text-center">
              <h4 className="text-[18px] font-bold text-gray-900 mb-6">Share this course</h4>
              <div className="flex items-center justify-center gap-4">
               
                <button className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm text-[#1877F2]">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M9 8H7v4h2v9h4v-9h3.6l.4-4H13V6.6c0-1 .3-1.6 1.7-1.6H16V1h-3.4c-3.4 0-4.6 2-4.6 4.4V8z"/></svg>
                </button>

                <button className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm text-[#1DA1F2]">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 4.6a10 10 0 01-2.9.8 5 5 0 002.2-2.8c-1 .6-2 1-3.1 1.2a5 5 0 00-8.4 4.5A14 14 0 011.6 3a5 5 0 001.5 6.7 5 5 0 01-2.2-.6v.1a5 5 0 004 4.9 5 5 0 01-2.2.1 5 5 0 004.7 3.5A10 10 0 010 19.7a14 14 0 007.6 2.2c9.1 0 14.1-7.6 14.1-14.1v-.6A10 10 0 0024 4.6z"/></svg>
                </button>

                <button className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm text-[#0A66C2]">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M22.2 0H1.8C.8 0 0 .8 0 1.8v20.4C0 23.2.8 24 1.8 24h20.4c1 0 1.8-.8 1.8-1.8V1.8C24 .8 23.2 0 22.2 0zM7.1 20.4H3.6V9h3.6v11.4zM5.3 7.6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm15.1 12.8h-3.6v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.7H9.3V9h3.4v1.6h.1c.5-.9 1.6-1.9 3.4-1.9 3.7 0 4.3 2.4 4.3 5.5v6.2z"/></svg>
                </button>

                <button className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm text-gray-500">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.812a4 4 0 005.656 0l4-4a4 4 0 10-5.656-5.656l-1.1 1.1"></path></svg>
                </button>

              </div>
            </div>

          </div>
        </div>

      </main>
    </div>
  );
}