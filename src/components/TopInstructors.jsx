"use client";
import Link from "next/link";

export default function TopInstructors() {
  const instructors = [
    { id: 1, name: "John Doe", role: "Full Stack Developer", rating: 4.9, image: "/asset/emp4.jpeg" },
    { id: 2, name: "Jane Smith", role: "UI/UX Designer", rating: 4.8, image: "/asset/emp1.jpeg" },
    { id: 3, name: "Michael Brown", role: "Digital Marketer", rating: 4.7, image: "/asset/emp2.jpeg" },
    { id: 4, name: "Emily Johnson", role: "Content Strategist", rating: 4.8, image: "/asset/emp3.png" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          🏆 Top Instructors
        </h2>
        <Link href="/instructors" className="text-[#016c45] font-semibold text-[15px] hover:underline">
          View All
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {instructors.map((inst) => (
          <div key={inst.id} className="bg-white rounded-2xl p-6 flex flex-col items-center text-center shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 hover:-translate-y-1 transition-transform">
            <div className="w-24 h-24 rounded-full overflow-hidden mb-4 bg-gray-100 border-2 border-gray-50">
              <img src={inst.image} alt={inst.name} className="w-full h-full object-cover" />
            </div>
            <h3 className="text-[18px] font-bold text-gray-900">{inst.name}</h3>
            <p className="text-[14px] text-gray-500 font-medium mb-3">{inst.role}</p>
            <div className="flex items-center gap-1 text-yellow-500 font-bold text-[14px]">
              ⭐ {inst.rating}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}