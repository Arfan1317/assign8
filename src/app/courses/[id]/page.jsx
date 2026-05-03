"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import coursesData from "@/data/courses.json";

export default function CourseDetailsPage({ params }) {
  const { data: session, status } = useSession();
  const router = useRouter();

 
  useEffect(() => {
   
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  
  if (status === "loading" || status === "unauthenticated") {
    return <div className="min-h-screen flex items-center justify-center">Loading secure content...</div>;
  }

  
  const course = coursesData.find((c) => c.id === params.id);

  if (!course) return <div>Course not found!</div>;

  return (
    <div>
      {

      }
      {course.curriculum.map((chapter) => (
        <div key={chapter.id} className="flex justify-between border-b py-4">
          <span>{chapter.title} ({chapter.lessons})</span>
          {chapter.isLocked ? (
            <span>🔒 Locked</span>
          ) : (
            <span>📖 Open</span>  
          )}
        </div>
      ))}
    </div>
  );
}