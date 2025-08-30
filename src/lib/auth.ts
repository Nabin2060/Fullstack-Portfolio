import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "./db";

const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-jwt-key";

export interface JWTPayload {
  userId: number;
  username: string;
  role: string;
}

// Hash password
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12;
  return bcrypt.hash(password, saltRounds);
}

// Compare password
export async function comparePassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

// Generate JWT token
export function generateToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });
}

// Verify JWT token
export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch (err) {
    console.log("Token verification failed:", err);
    return null;
  }
}

// Authenticate user
export async function authenticateUser(username: string, password: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { username }
    });

    if (!user) {
      return null;
    }

    const isValidPassword = await comparePassword(password, user.password);

    if (!isValidPassword) {
      return null;
    }

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role
    };
  } catch (error) {
    console.error("Authentication error:", error);
    return null;
  }
}

// Middleware to verify JWT token
export function verifyAuth(token: string | undefined): JWTPayload | null {
  if (!token) {
    return null;
  }

  // Remove 'Bearer ' prefix if present
  const cleanToken = token.replace("Bearer ", "");
  return verifyToken(cleanToken);
}
