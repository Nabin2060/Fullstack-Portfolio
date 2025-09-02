import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// POST - Submit contact form
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        {
          success: false,
          message: "Name, email, and message are required"
        },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email format"
        },
        { status: 400 }
      );
    }

    // Save contact message to database
    const contact = await prisma.contact.create({
      data: {
        name,
        email,
        message
      }
    });

    return NextResponse.json(
      {
        success: true,
        data: {
          id: contact.id,
          name: contact.name,
          email: contact.email,
          message: contact.message,
          createdAt: contact.createdAt
        },
        message: "Message sent successfully"
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact submission error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send message" },
      { status: 500 }
    );
  }
}

// GET - Get all contact messages (admin only)
export async function GET() {
  try {
    // In a real app, you would verify admin authentication here
    const contacts = await prisma.contact.findMany({
      orderBy: {
        createdAt: "desc"
      }
    });

    return NextResponse.json({
      success: true,
      data: contacts,
      message: "Contacts fetched successfully"
    });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch contacts" },
      { status: 500 }
    );
  }
}
