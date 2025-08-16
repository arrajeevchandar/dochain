import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { username, email, password } = await req.json();

    // Trim all values to remove accidental spaces
    const trimmedUsername = username?.trim();
    const trimmedEmail = email?.trim();
    const trimmedPassword = password?.trim();

    // Validate all fields
    if (
      !trimmedUsername ||
      typeof trimmedUsername !== "string" ||
      !trimmedEmail ||
      typeof trimmedEmail !== "string" ||
      !trimmedPassword ||
      typeof trimmedPassword !== "string"
    ) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      return NextResponse.json({ error: "Invalid email format." }, { status: 400 });
    }

    // Validate password length
    if (trimmedPassword.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters." }, { status: 400 });
    }

    // Check for existing user by email or username
    const existingUser = await prisma.user.findFirst({
      where: { OR: [{ email: trimmedEmail }, { name: trimmedUsername }] },
    });
    if (existingUser) {
      return NextResponse.json(
        { error: "Email or username already registered." },
        { status: 400 }
      );
    }

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(trimmedPassword, 10);
    const user = await prisma.user.create({
      data: {
        name: trimmedUsername,
        email: trimmedEmail,
        hashedPassword,
      },
    });

    // Optionally, you can return a success message or just the user object
    return NextResponse.json({ user });
  } catch (err) {
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
