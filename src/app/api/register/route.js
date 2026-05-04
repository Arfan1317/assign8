import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { name, email, password, image } = await req.json();
    
    if (!name || !email || !password) {
       return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    await connectMongoDB();

    const userExists = await User.findOne({ email });
    if (userExists) {
      return NextResponse.json({ message: "Email is already registered" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    await User.create({ 
      name, 
      email, 
      password: hashedPassword, 
      image: image || "" 
    });

    return NextResponse.json({ message: "User registered successfully" }, { status: 201 });
    
  } catch (error) {
    console.error("Backend Registration Error: ", error);
    return NextResponse.json({ message: "An error occurred while registering" }, { status: 500 });
  }
}