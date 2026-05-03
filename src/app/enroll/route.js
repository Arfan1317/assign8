import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const email = req.nextUrl.searchParams.get("email");
    if (!email) return NextResponse.json({ enrolledCourses: [] });

    await connectMongoDB();
    const user = await User.findOne({ email });

    return NextResponse.json({ enrolledCourses: user?.enrolledCourses || [] }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ enrolledCourses: [] }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { email, courseId } = await req.json();
    await connectMongoDB();

    let user = await User.findOne({ email });

    if (!user) {
      await User.create({ email, name: "Student", enrolledCourses: [courseId] });
    } else {
      await User.findOneAndUpdate({ email }, { $addToSet: { enrolledCourses: courseId } });
    }

    return NextResponse.json({ message: "Enrolled successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { email } = await req.json();
    await connectMongoDB();

    
    await User.findOneAndUpdate(
      { email },
      { $set: { enrolledCourses: [] } }
    );

    return NextResponse.json({ message: "All courses removed" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error removing courses" }, { status: 500 });
  }
}