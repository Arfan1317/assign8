export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-4xl font-bold text-[#016c45]">Welcome to SkillSphere</h1>
      <p className="mt-4 text-gray-600">The main landing page is under construction.</p>
      <div className="mt-8 flex gap-4">
        <a href="/login" className="px-6 py-2 bg-[#016c45] text-white rounded-xl font-bold">Go to Login</a>
        <a href="/register" className="px-6 py-2 border border-[#016c45] text-[#016c45] rounded-xl font-bold">Go to Register</a>
      </div>
    </div>
  );
}