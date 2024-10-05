import { NextRequest, NextResponse } from "next/server";
import { User } from "@/lib/models/User";
import { connectToDatabase } from "@/lib/db";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  await connectToDatabase();

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  const newUser = new User({ email, password });
  await newUser.save();
  return NextResponse.json({ message: "User registered successfully" });
}
