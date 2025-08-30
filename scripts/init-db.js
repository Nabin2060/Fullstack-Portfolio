const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Starting database initialization...');

  try {
    // Test database connection
    await prisma.$connect();
    console.log('✅ Database connected successfully');

    // Create admin user with hashed password
    const hashedPassword = await bcrypt.hash('admin123', 12);

    const adminUser = await prisma.user.upsert({
      where: { username: 'admin' },
      update: {},
      create: {
        username: 'admin',
        email: 'admin@portfolio.com',
        password: hashedPassword,
        role: 'ADMIN'
      }
    });

    console.log('✅ Admin user created/updated:', adminUser.username);

    // Check if projects already exist
    const existingProjects = await prisma.project.count();

    if (existingProjects === 0) {
      // Seed initial projects
      const projects = [
        {
          title: "Site design for IT company",
          description: "A modern website design for a technology company featuring clean UI and responsive design.",
          image: "/api/placeholder/400/300",
          category: "Website",
          link: "#",
          featured: true
        },
        {
          title: "Travel app design",
          description: "Mobile application design for travel booking with intuitive user experience.",
          image: "/api/placeholder/400/300",
          category: "App Design",
          link: "#",
          featured: true
        },
        {
          title: "E-commerce platform",
          description: "Full-stack e-commerce solution with modern design and advanced features.",
          image: "/api/placeholder/400/300",
          category: "Full Stack",
          link: "#",
          featured: false
        },
        {
          title: "Portfolio Website",
          description: "Personal portfolio website built with Next.js, TypeScript, and GSAP animations.",
          image: "/api/placeholder/400/300",
          category: "Full Stack",
          link: "#",
          featured: true
        }
      ];

      await prisma.project.createMany({
        data: projects,
        skipDuplicates: true
      });

      console.log('✅ Projects seeded successfully');
    } else {
      console.log('✅ Projects already exist, skipping seeding');
    }

    console.log('\n🎉 Database initialization completed!');
    console.log('\n📋 Setup Summary:');
    console.log('- Admin user: admin/admin123');
    console.log('- Projects: 4 initial projects created');
    console.log('- Database: Ready for use');

  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
