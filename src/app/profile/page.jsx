"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Inter } from "next/font/google";
import { toast } from "react-toastify";
import coursesData from "@/data/courses.json";

const inter = Inter({ subsets: ["latin"] });

const EditIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
);

export default function UserProfilePage() {
  const { data: session, status } = useSession();
  
  const [userProfile, setUserProfile] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = () => {
      if (status === "unauthenticated") {
        setIsLoading(false);
        return;
      }

      if (status === "authenticated" && session?.user) {
       
        const baseProfile = {
          name: session.user.name || "Student",
          email: session.user.email,
          image: session.user.image,
          memberSince: new Date(), 
          enrolledCourseIds: coursesData.length > 1 ? [coursesData[0].id, coursesData[1].id] : [],
        };

        const mappedCourses = coursesData.filter((c) => 
          baseProfile.enrolledCourseIds.includes(c.id)
        );

        setUserProfile(baseProfile);
        setEnrolledCourses(mappedCourses);
        
        setTimeout(() => setIsLoading(false), 800);
      }
    };

    if (status !== "loading") fetchUserData();
  }, [status, session]);

  const handleRemoveAllCourses = () => {
    if (!window.confirm("Are you sure you want to remove all your enrolled courses?")) return;
    
    setEnrolledCourses([]); 
    toast.success("All enrolled courses have been removed from view.");
  };

  if (isLoading || status === "loading") {
    return (
      <div className={`min-h-screen bg-white flex justify-center items-center ${inter.className}`}>
        <svg className="animate-spin h-12 w-12 text-[#016c45]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    );
  }

  if (status === "unauthenticated" || !userProfile) {
    return (
      <div className={`min-h-screen pt-32 text-center bg-white ${inter.className}`}>
        <h1 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">Access Denied!</h1>
        <p className="text-gray-500 mb-6">Please login to view your profile.</p>
        <Link href="/login" className="px-6 py-3 bg-[#016c45] text-white font-semibold rounded-xl hover:bg-[#015234] transition-colors">
          Go to Login
        </Link>
      </div>
    );
  }

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className={`min-h-screen bg-[#f8fafc] text-gray-900 antialiased ${inter.className}`}>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24">
        
        <div className="mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">My Profile</h1>
          <p className="text-[1.1rem] text-gray-500 font-medium">Manage your account information and learning progress.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr,2.2fr] gap-8 lg:gap-10">
          
          {/* LEFT COLUMN */}
          <div className="space-y-8 lg:sticky lg:top-28 lg:self-start">
            <div className="bg-white rounded-3xl p-10 flex flex-col items-center text-center shadow-[0_4px_20px_rgb(0,0,0,0.02)] border border-gray-100">
              <div className="w-40 h-40 rounded-full overflow-hidden mb-6 bg-gray-100 border-4 border-white shadow-[0_8px_30px_rgba(0,0,0,0.06)] relative flex items-center justify-center">
                
                {/* ✅ THE FIX: Bulletproof Image Tag with themed fallback! */}
                <img 
                  src={userProfile.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(userProfile.name)}&background=016c45&color=fff`} 
                  alt={userProfile.name} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null; // Prevents looping if fallback also fails
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(userProfile.name)}&background=016c45&color=fff`;
                  }}
                />

              </div>

              <h3 className="text-2xl font-bold text-gray-900 leading-tight mb-2 truncate max-w-full">
                {userProfile.name}
              </h3>
              <p className="text-[15px] font-medium text-gray-500 mb-5 truncate max-w-full">
                {userProfile.email}
              </p>
              
              <span className="inline-block bg-[#e6f0eb] text-[#016c45] px-4 py-2.5 rounded-full text-[13px] font-bold mb-6">Learner</span>
              <div className="text-[14px] font-semibold text-gray-500 mb-10 pb-8 border-b border-gray-100 w-full">
                Member since <br/> <span className="text-gray-900 font-bold mt-1 inline-block">{formatDate(userProfile.memberSince)}</span>
              </div>

              <Link href="/profile/edit" className="w-full h-[52px] mt-auto flex items-center justify-center gap-2.5 border-2 border-[#016c45] text-[#016c45] font-bold rounded-xl text-[15px] hover:bg-[#e6f0eb] transition-all">
                <EditIcon className="w-4 h-4" />
                Update Information
              </Link>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-6">
            
            <div className="bg-white rounded-3xl p-7 border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)]">
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 tracking-tight">Account Information</h3>
                <Link href="/profile/edit">
                   <EditIcon className="w-5 h-5 text-[#016c45] hover:text-[#015234] cursor-pointer" />
                </Link>
              </div>

              <div className="space-y-4 text-[15px] font-medium text-gray-700">
                <div className="grid grid-cols-[1fr,2.5fr] items-center gap-4 py-2 border-b border-gray-50">
                   <span className="font-bold text-gray-900">Name</span>
                   <span className="text-gray-700 font-semibold flex justify-between items-center gap-4">
                     {userProfile.name}
                     <Link href="/profile/edit"><EditIcon className="w-4 h-4 text-gray-300 hover:text-[#016c45] shrink-0" /></Link>
                   </span>
                </div>
                <div className="grid grid-cols-[1fr,2.5fr] items-center gap-4 py-2 border-b border-gray-50">
                   <span className="font-bold text-gray-900">Email</span>
                   <span className="text-gray-700 font-semibold flex justify-between items-center gap-4">
                     {userProfile.email}
                     <Link href="/profile/edit"><EditIcon className="w-4 h-4 text-gray-300 hover:text-[#016c45] shrink-0" /></Link>
                   </span>
                </div>
                <div className="grid grid-cols-[1fr,2.5fr] items-center gap-4 py-2 border-b border-gray-50">
                   <span className="font-bold text-gray-900">Member Since</span>
                   <span className="text-gray-700 font-semibold flex justify-between items-center gap-4">
                     {formatDate(userProfile.memberSince)}
                     <Link href="/profile/edit"><EditIcon className="w-4 h-4 text-gray-300 hover:text-[#016c45] shrink-0" /></Link>
                   </span>
                </div>
              </div>
            </div>

            {/* Enrolled Courses */}
            <div className="bg-white rounded-3xl p-7 border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)]">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
                  Enrolled Courses
                  <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">{enrolledCourses.length}</span>
                </h3>
                
                <div className="flex items-center gap-4">
                  {enrolledCourses.length > 0 && (
                    <button 
                      onClick={handleRemoveAllCourses}
                      className="text-red-500 font-semibold text-[14px] hover:text-red-600 hover:underline flex items-center gap-1.5 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                      Remove All
                    </button>
                  )}
                  <Link href="/courses" className="text-[#016c45] font-semibold text-[14px] hover:underline">
                    Explore More
                  </Link>
                </div>
              </div>

              {enrolledCourses.length === 0 ? (
                <div className="text-center py-12 text-gray-500 font-semibold bg-[#f8fafc] rounded-2xl border border-gray-100 flex flex-col items-center gap-4">
                  <div className="p-3 rounded-full bg-[#e6f0eb] text-[#016c45] border border-green-100">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                  </div>
                  No enrolled courses yet.
                  <Link href="/courses" className="px-5 py-2 bg-[#016c45] text-white text-[13px] font-semibold rounded-xl hover:bg-[#015234] transition-colors shadow-sm">
                    Find a Course
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {enrolledCourses.map((course) => (
                    <Link href={`/courses/${course.id}`} key={course.id} className="block group">
                      <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col h-full transition-transform hover:-translate-y-1">
                        <div className="relative h-32 w-full bg-gray-100 border-b border-gray-50">
                          <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="p-4 flex flex-col flex-grow">
                          <h4 className="font-bold text-[14px] text-gray-900 leading-snug mb-1.5 line-clamp-2 transition-colors group-hover:text-[#016c45]">
                            {course.title}
                          </h4>
                          <div className="flex justify-between items-center text-[12px] text-gray-500 font-medium mt-auto pt-2">
                            <span>⭐ {course.rating}</span>
                            <span className="bg-[#f4fcf8] text-[#016c45] px-2 py-0.5 rounded text-[10px] font-bold border border-green-50">{course.category}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>

      </main>
    </div>
  );
}