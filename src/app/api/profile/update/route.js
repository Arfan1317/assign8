import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
// ✅ Using the @ shortcut here too!
import { authOptions } from "@/lib/authOptions"; 

export async function PUT(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json({ message: "Unauthorized access!" }, { status: 401 });
    }

    const { name, image } = await req.json();

    if (!name || name.trim() === "") {
      return NextResponse.json({ message: "Name is required." }, { status: 400 });
    }

    await connectMongoDB();

    const updatedUser = await User.findOneAndUpdate(
      { email: session.user.email },
      { 
        $set: { 
          name: name.trim(), 
          image: image 
        } 
      },
      { returnDocument: 'after' }
    );

    if (!updatedUser) {
      return NextResponse.json({ message: "User not found in database." }, { status: 404 });
    }

    return NextResponse.json({ 
      message: "Profile updated successfully permanently.",
      user: {
        name: updatedUser.name,
        email: updatedUser.email,
        image: updatedUser.image
      }
    }, { status: 200 });

  } catch (error) {
    console.error("Database Update Error:", error);
    return NextResponse.json({ message: "Server error during permanent update." }, { status: 500 });
  }
}