"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Inter } from "next/font/google";
import { toast } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

const BackIcon = () => (
  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
);
const ImageIcon = () => (
  <svg className="w-5 h-5 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
);

export default function EditProfilePage() {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  
  const [name, setName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      setName(session.user.name || "");
      setPhotoUrl(session.user.image || "");
      setIsLoadingData(false);
    } else if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [session, status, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || name.trim() === "") {
      toast.error("Name is required!");
      return;
    }

    setIsUpdating(true);

   
    let finalImageUrl = photoUrl;
    if (finalImageUrl && finalImageUrl.includes("imgurl=")) {
      try {
        const urlObj = new URL(finalImageUrl);
        const extractedUrl = urlObj.searchParams.get("imgurl");
        if (extractedUrl) {
          finalImageUrl = extractedUrl; 
        }
      } catch (error) {
        console.log("Could not extract Google image URL");
      }
    }

    try {
      const res = await fetch("/api/profile/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
       
        body: JSON.stringify({ 
          name: name, 
          image: finalImageUrl 
        }),
      });

      const data = await res.json();

      if (res.ok) {
        
        await update({
          name: name,
          image: finalImageUrl,
        });

        toast.success("Profile updated successfully!");
        setTimeout(() => router.push("/profile"), 1000); 
      } else {
        toast.error(data.message || "Failed to update profile.");
      }
    } catch (error) {
      toast.error("An error occurred during update.");
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoadingData || status === "loading") {
    return (
      <div className={`min-h-screen bg-[#f8fafc] flex justify-center items-center ${inter.className}`}>
        <svg className="animate-spin h-10 w-10 text-[#016c45]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-[#f8fafc] text-gray-900 antialiased ${inter.className}`}>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-3xl p-12 shadow-[0_4px_20px_rgb(0,0,0,0.02)] border border-gray-100">
            
            <div className="flex items-start gap-8 mb-12">
              <button 
                onClick={() => router.back()} 
                className="inline-flex items-center px-5 py-2.5 bg-white border-2 border-gray-100 hover:bg-gray-50 text-gray-900 font-semibold rounded-xl text-[14px] shadow-sm transition-colors"
              >
                <BackIcon />
                Back
              </button>
              
              <div className="flex-1">
                <h2 className="text-3xl font-extrabold text-gray-900 leading-tight mb-2 tracking-tight">Update Information</h2>
                <p className="text-[16px] text-gray-500 font-medium">Update your name and profile picture.</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl">
              
              <div className="flex justify-center mb-6">
                <img 
                  src={photoUrl || `https://ui-avatars.com/api/?name=${name || 'User'}&background=016c45&color=fff`} 
                  alt="Avatar Preview" 
                  className="w-28 h-28 rounded-full object-cover shadow-sm border-4 border-gray-50"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${name || 'User'}&background=016c45&color=fff`;
                  }}
                />
              </div>

              <div className="space-y-2.5">
                <label className="text-[15px] font-bold text-gray-900">Photo URL</label>
                <div className="relative">
                  <input 
                    type="url" 
                    value={photoUrl}
                    onChange={(e) => {
                      let val = e.target.value;
                      
                      if (val.includes("imgurl=")) {
                        try {
                          const urlObj = new URL(val);
                          const extracted = urlObj.searchParams.get("imgurl");
                          if (extracted) val = extracted;
                        } catch (err) {
                         
                        }
                      }
                      setPhotoUrl(val);
                    }}
                    placeholder="Enter new photo URL" 
                    className="w-full h-[54px] px-6 rounded-xl border border-gray-200 bg-white text-[15px] placeholder-gray-400 focus:border-[#016c45] focus:ring-0 transition-colors"
                  />
                  <ImageIcon />
                </div>
              </div>

              <div className="space-y-2.5">
                <label className="text-[15px] font-bold text-gray-900">Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your new name" 
                  required
                  className="w-full h-[54px] px-6 rounded-xl border border-gray-200 bg-white text-[15px] placeholder-gray-400 focus:border-[#016c45] focus:ring-0 transition-colors"
                />
              </div>

              <div className="pt-6">
                <button 
                  type="submit" 
                  disabled={isUpdating}
                  className={`w-full h-[56px] bg-[#016c45] hover:bg-[#015234] text-white font-bold rounded-xl text-[16px] shadow-md transition-colors flex items-center justify-center gap-2 ${isUpdating ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isUpdating ? "Permanently Updating..." : "Update Information"}
                </button>
              </div>

            </form>
          </div>
        </div>
      </main>
    </div>
  );
}