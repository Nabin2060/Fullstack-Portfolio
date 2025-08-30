import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// Database connection test
export async function testConnection() {
  try {
    await prisma.$connect();
    console.log("Database connected successfully");
    return true;
  } catch (error) {
    console.error(" Database connection failed:", error);
    return false;
  }
}

export async function seedDatabase() {
  try {
    // Check if projects already exist
    const existingProjects = await prisma.project.count();

    if (existingProjects === 0) {
      const projects = [
        {
          title: "Site design for IT company",
          description:
            "A modern website design for a technology company featuring clean UI and responsive design.",
          image: "/api/placeholder/400/300",
          category: "Website",
          link: "#",
          featured: true
        },
        {
          title: "Travel app design",
          description:
            "Mobile application design for travel booking with intuitive user experience.",
          image: "/api/placeholder/400/300",
          category: "App Design",
          link: "#",
          featured: true
        },
        {
          title: "E-commerce platform",
          description:
            "Full-stack e-commerce solution with modern design and advanced features.",
          image: "/api/placeholder/400/300",
          category: "Full Stack",
          link: "#",
          featured: false
        }
      ];

      await prisma.project.createMany({
        data: projects
      });

      console.log(" Database seeded with initial projects");
    }

    // Check if admin user exists
    const existingAdmin = await prisma.user.findFirst({
      where: { username: "admin" }
    });

    if (!existingAdmin) {
      // Create admin user (password will be hashed in the auth API)
      await prisma.user.create({
        data: {
          username: process.env.ADMIN_USERNAME || "admin",
          email: process.env.ADMIN_EMAIL || "admin@portfolio.com",
          password: process.env.ADMIN_PASSWORD || "admin123",
          role: "ADMIN"
        }
      });

      console.log("Admin user created");
    }
  } catch (error) {
    console.error("Database seeding failed:", error);
  }
}
