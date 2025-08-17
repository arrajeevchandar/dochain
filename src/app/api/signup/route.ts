import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma"; // Adjust path if needed

export async function POST(req: Request) {
  try {
    // Parse request body
    const { name, email, password } = await req.json();

    // Validate required fields
    if (!name || !email || !password) {
      console.error("Missing required fields:", { name, email, password });
      return NextResponse.json({ error: "Name, email and password are required" }, { status: 400 });
    }

    // Optional: trim string fields
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    // Validate email format (simple regex)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    // Validate password minimum length
    if (trimmedPassword.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: trimmedEmail },
    });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await hash(trimmedPassword, 10);

    // Create user in DB
    const newUser = await prisma.user.create({
      data: {
        name: trimmedName,
        email: trimmedEmail,
        hashedPassword,
      },
    });

    // Return response with user details (never return password hash!)
    return NextResponse.json(
      {
        message: "User created successfully",
        user: { id: newUser.id, name: newUser.name, email: newUser.email }
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
