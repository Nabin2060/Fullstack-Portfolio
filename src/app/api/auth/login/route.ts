import { NextRequest, NextResponse } from "next/server";
import { authenticateUser, generateToken, hashPassword } from "@/lib/auth";
import { prisma } from "@/lib/db";

// POST - Login user
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // Validate required fields
    if (!username || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Username and password are required"
        },
        { status: 400 }
      );
    }

    // Authenticate user
    const user = await authenticateUser(username, password);

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid credentials"
        },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = generateToken({
      userId: user.id,
      username: user.username,
      role: user.role
    });

    return NextResponse.json({
      success: true,
      data: {
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role
        },
        token
      },
      message: "Login successful"
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, message: "Login failed" },
      { status: 500 }
    );
  }
}

// POST - Register user (for initial setup)
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password, email } = body;

    // Validate required fields
    if (!username || !password || !email) {
      return NextResponse.json(
        {
          success: false,
          message: "Username, password, and email are required"
        },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ username }, { email }]
      }
    });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User already exists"
        },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        role: "ADMIN" // For initial setup
      }
    });

    return NextResponse.json(
      {
        success: true,
        data: {
          id: newUser.id,
          username: newUser.username,
          email: newUser.email,
          role: newUser.role
        },
        message: "User created successfully"
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { success: false, message: "Registration failed" },
      { status: 500 }
    );
  }
}
