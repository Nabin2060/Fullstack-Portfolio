import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifyAuth } from "@/lib/auth";

// GET - Fetch all projects
export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: {
        createdAt: "desc"
      }
    });

    return NextResponse.json({
      success: true,
      data: projects,
      message: "Projects fetched successfully"
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

// POST - Create new project
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const authHeader = request.headers.get("authorization");
    const user = verifyAuth(authHeader || undefined);

    if (!user || user.role !== "ADMIN") {
      return NextResponse.json(
        { success: false, message: "Authentication required" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { title, description, image, category, link, featured } = body;

    // Validate required fields
    if (!title || !description || !category) {
      return NextResponse.json(
        {
          success: false,
          message: "Title, description, and category are required"
        },
        { status: 400 }
      );
    }

    const newProject = await prisma.project.create({
      data: {
        title,
        description,
        image: image || "/api/placeholder/400/300",
        category,
        link: link || "#",
        featured: featured || false
      }
    });

    return NextResponse.json(
      {
        success: true,
        data: newProject,
        message: "Project created successfully"
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create project" },
      { status: 500 }
    );
  }
}

// PUT - Update project
export async function PUT(request: NextRequest) {
  try {
    // Check authentication
    const authHeader = request.headers.get("authorization");
    const user = verifyAuth(authHeader || undefined);

    if (!user || user.role !== "ADMIN") {
      return NextResponse.json(
        { success: false, message: "Authentication required" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Project ID is required" },
        { status: 400 }
      );
    }

    const existingProject = await prisma.project.findUnique({
      where: { id: parseInt(id) }
    });

    if (!existingProject) {
      return NextResponse.json(
        { success: false, message: "Project not found" },
        { status: 404 }
      );
    }

    const updatedProject = await prisma.project.update({
      where: { id: parseInt(id) },
      data: updates
    });

    return NextResponse.json({
      success: true,
      data: updatedProject,
      message: "Project updated successfully"
    });
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update project" },
      { status: 500 }
    );
  }
}

// DELETE - Delete project
export async function DELETE(request: NextRequest) {
  try {
    // Check authentication
    const authHeader = request.headers.get("authorization");
    const user = verifyAuth(authHeader || undefined);

    if (!user || user.role !== "ADMIN") {
      return NextResponse.json(
        { success: false, message: "Authentication required" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = parseInt(searchParams.get("id") || "0");

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Project ID is required" },
        { status: 400 }
      );
    }

    const existingProject = await prisma.project.findUnique({
      where: { id }
    });

    if (!existingProject) {
      return NextResponse.json(
        { success: false, message: "Project not found" },
        { status: 404 }
      );
    }

    const deletedProject = await prisma.project.delete({
      where: { id }
    });

    return NextResponse.json({
      success: true,
      data: deletedProject,
      message: "Project deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete project" },
      { status: 500 }
    );
  }
}
