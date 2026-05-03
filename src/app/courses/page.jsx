"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import coursesData from "@/data/courses.json"; 

export default function CoursesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

 
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [currentPage, setCurrentPage] = useState(1);

  const coursesPerPage = 6;

  
  const categories = ["All Categories", ...new Set(coursesData.map(c => c.category))];

  useEffect(() => {
    
    const fetchCourses = () => {
      setTimeout(() => {
        setCourses(coursesData);
        setIsLoading(false);
      }, 1000);
    };
    fetchCourses();
  }, []);

 
  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All Categories" || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);

  
  const handleFullDetailsClick = (courseId) => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else {
      router.push(`/courses/${courseId}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24">
      
      
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">All Courses</h1>
        <p className="text-[1.1rem] text-gray-500 font-medium">Explore our wide range of courses and find the perfect one for you.</p>
      </div>

    
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-10">
        
       
        <div className="relative w-full sm:max-w-md">
          <input 
            type="text" 
            placeholder="Search courses by title..." 
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            className="w-full h-[52px] pl-4 pr-12 bg-white text-gray-900 border border-gray-200 rounded-xl focus:border-[#016c45] focus:outline-none focus:ring-1 focus:ring-[#016c45] transition-colors shadow-sm"
          />
          <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>

       
        <div className="w-full sm:w-auto relative">
          <select 
            value={selectedCategory}
            onChange={(e) => { setSelectedCategory(e.target.value); setCurrentPage(1); }}
            className="w-full sm:w-64 h-[52px] px-4 appearance-none bg-white text-gray-700 font-medium border border-gray-200 rounded-xl focus:border-[#016c45] focus:outline-none focus:ring-1 focus:ring-[#016c45] cursor-pointer shadow-sm transition-colors"
          >
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>{cat}</option>
            ))}
          </select>
          <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
        </div>

      </div>

      
      {isLoading ? (
        <div className="flex justify-center items-center py-32">
           <svg className="animate-spin h-12 w-12 text-[#016c45]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      ) : currentCourses.length === 0 ? (
        <div className="text-center py-32 text-gray-500 font-medium text-lg">
          No courses found matching your criteria.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {currentCourses.map((course) => (
              <div key={course.id} className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 flex flex-col transition-transform hover:-translate-y-1">
                
              
                <div className="relative h-56 w-full bg-gray-900 p-2">
                  <img src={course.image} alt={course.title} className="w-full h-full object-contain rounded-xl" />
                  <span className="absolute top-4 left-4 bg-[#016c45] text-white text-[12px] font-semibold px-3 py-1 rounded-md shadow-sm">
                    {course.category}
                  </span>
                </div>

                
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="font-bold text-[19px] text-gray-900 leading-snug mb-2 line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-gray-500 font-medium mb-5">{course.instructor.name}</p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center text-[14px]">
                      <div className="flex items-center text-gray-600 gap-1.5 font-medium">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        {course.duration}
                      </div>
                      <div className="flex items-center text-yellow-500 font-bold gap-1">
                        ⭐ {course.rating} <span className="text-gray-400 font-normal">({course.reviews})</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center text-[14px]">
                      <div className="flex items-center text-gray-600 gap-1.5 font-medium">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
                        {course.level}
                      </div>
                    </div>
                  </div>

                  
                  <button 
                    onClick={() => handleFullDetailsClick(course.id)}
                    className="mt-auto w-full py-3 bg-white text-[#016c45] border-2 border-[#016c45] hover:bg-[#016c45] hover:text-white text-[15px] font-bold rounded-xl transition-colors flex justify-center items-center gap-2"
                  >
                    View Full Details
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

         
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
              </button>
              
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-10 h-10 flex items-center justify-center rounded-lg font-semibold transition-colors ${
                    currentPage === i + 1 
                      ? "bg-[#016c45] text-white border border-[#016c45]" 
                      : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}