import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "@/lib/models/User";
import { connectToDatabase } from "@/lib/db";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  await connectToDatabase();

  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
  }

  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET || "your-jwt-secret",
    {
      expiresIn: "1h",
    }
  );

  return NextResponse.json(
    { message: "Login successful" },
    {
      headers: {
        "Set-Cookie": `authToken=${token}; Path=/; HttpOnly; SameSite=Strict;`,
      },
    }
  );
}
