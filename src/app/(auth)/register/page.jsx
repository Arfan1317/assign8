"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { Inter } from "next/font/google";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error("Please fill all required fields!");
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, image }),
      });

      if (res.ok) {
        toast.success("Registration successful! Please login.");
        e.target.reset();
        router.push("/login");
      } else {
        const data = await res.json();
        toast.error(data.message || "Registration failed.");
      }
    } catch (error) {
      toast.error("Something went wrong. Try again.");
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center bg-[#fafafa] p-4 py-8 ${inter.className}`}>
      <div className="max-w-md w-full bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 border border-gray-100">
        <div className="flex items-center gap-2 mb-6">
          <img src="/asset/logofooter.png" alt="SkillSphere Logo" className="w-8 h-8 rounded-md" />
          <h1 className="text-xl font-bold text-gray-900">Register</h1>
        </div>

        <div className="text-center mb-6">
          <h2 className="text-[26px] font-bold text-gray-900 mb-1.5 tracking-tight">Create an Account</h2>
          <p className="text-[15px] text-gray-500 font-medium">Join thousands of learners today.</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1.5">Name</label>
            <input onChange={(e) => setName(e.target.value)} type="text" placeholder="Enter your name" className="w-full h-[46px] px-4 bg-white text-gray-900 border border-gray-200 rounded-xl focus:border-[#016c45] focus:outline-none focus:ring-1 focus:ring-[#016c45] text-sm transition-colors" required />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1.5">Email</label>
            <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter your email" className="w-full h-[46px] px-4 bg-white text-gray-900 border border-gray-200 rounded-xl focus:border-[#016c45] focus:outline-none focus:ring-1 focus:ring-[#016c45] text-sm transition-colors" required />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1.5">Photo URL</label>
            <input onChange={(e) => setImage(e.target.value)} type="url" placeholder="Enter your photo URL" className="w-full h-[46px] px-4 bg-white text-gray-900 border border-gray-200 rounded-xl focus:border-[#016c45] focus:outline-none focus:ring-1 focus:ring-[#016c45] text-sm transition-colors" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1.5">Password</label>
            <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Create a password" className="w-full h-[46px] px-4 bg-white text-gray-900 border border-gray-200 rounded-xl focus:border-[#016c45] focus:outline-none focus:ring-1 focus:ring-[#016c45] text-sm transition-colors" required />
          </div>
          <button type="submit" className="w-full h-[46px] mt-2 bg-[#016c45] hover:bg-[#015234] text-white font-semibold rounded-xl text-[15px] transition-colors">Register</button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="px-4 text-[13px] font-medium text-gray-500">or continue with</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        <button type="button" onClick={() => signIn("google", { callbackUrl: "/" })} className="w-full h-[46px] bg-white hover:bg-gray-50 border border-gray-200 rounded-xl text-[15px] font-semibold text-gray-700 flex items-center justify-center gap-2.5 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-[18px] h-[18px]">
            <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
            <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
            <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.222,0-9.649-3.153-11.233-7.662l-6.576,4.825C9.526,39.467,16.208,44,24,44z"/>
            <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
          </svg>
          Continue with Google
        </button>

        <p className="text-center text-[14px] font-medium text-gray-500 mt-6">
          Already have an account? <Link href="/login" className="font-semibold hover:underline text-[#016c45]">Login</Link>
        </p>
      </div>
    </div>
  );
}