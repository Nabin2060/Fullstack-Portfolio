# John Doe Portfolio - Full Stack Developer Task

A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS. Features GSAP animations, dynamic project management, and a clean dark theme design.

## Features

### Frontend

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **GSAP Animations**: Smooth scroll animations and interactive elements
- **Dark Theme**: Modern dark aesthetic with pink accents
- **Component Architecture**: Reusable components with TypeScript
- **State Management**: React Context for project data management

### Backend

- **Next.js API Routes**: RESTful API for project CRUD operations
- **Authentication**: Basic auth for admin operations
- **Data Management**: Mock database with PostgreSQL-ready structure

### Animations

- Parallax moon effect in hero section
- Scroll-triggered animations for sections
- Hover effects on interactive elements
- Staggered text animations
- Floating star animations in collaboration section

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **Animations**: GSAP, Framer Motion
- **Icons**: Lucide React
- **State Management**: React Context
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT with bcrypt
- **Deployment**: Vercel

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd my-portfolio
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp env.example .env.local
   # Edit .env.local with your database URL and other settings
   ```

4. **Set up database**

   ```bash
   # Quick setup (recommended)
   npm run setup

   # Or step by step:
   npm run db:generate
   npm run db:push
   npm run db:seed
   ```

5. **Run the development server**

   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)
