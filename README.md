# John Doe Portfolio - Full Stack Developer Task

A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS. Features GSAP animations, dynamic project management, and a clean dark theme design.

## 🚀 Features

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

**📖 For detailed setup instructions, see [SETUP.md](./SETUP.md)**

## 🔧 Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── projects/
│   │       └── route.ts          # API endpoints
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
├── components/
│   ├── Header.tsx                # Navigation header
│   ├── HeroSection.tsx           # Hero with moon animation
│   ├── AboutSection.tsx          # About/Introduction
│   ├── ProjectsSection.tsx       # Projects grid
│   └── CollaborationSection.tsx  # Contact section
└── contexts/
    └── ProjectsContext.tsx       # State management
```

## 🎨 Design Features

### Hero Section

- Large moon graphic with parallax effect
- Animated headline "FROM DARKNESS TO THE DAWN, IDEAS TAKE FLIGHT"
- Download resume button with hover effects

### About Section

- "NAMASTE 🙏" greeting
- John Doe introduction
- Dotted line placeholders for story content

### Projects Section

- Dynamic project cards with hover animations
- Admin panel for project management
- "Couldn't find what you need?" call-to-action card

### Collaboration Section

- Starry background with animated stars
- "Want to collaborate??" headline
- Contact information with email button

## 🔐 API Endpoints

### Authentication

- **Credentials**: `admin/admin123`
- **Method**: JWT Token Authentication

### Login

```bash
POST /api/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123"
}
```

### Projects API (`/api/projects`)

#### GET - Fetch all projects

```bash
GET /api/projects
```

#### POST - Create new project

```bash
POST /api/projects
Authorization: Bearer <your-jwt-token>
Content-Type: application/json

{
  "title": "Project Title",
  "description": "Project description",
  "category": "Website",
  "image": "/path/to/image",
  "link": "https://project-link.com",
  "featured": true
}
```

#### PUT - Update project

```bash
PUT /api/projects
Authorization: Bearer <your-jwt-token>
Content-Type: application/json

{
  "id": 1,
  "title": "Updated Title",
  "description": "Updated description"
}
```

#### DELETE - Delete project

```bash
DELETE /api/projects?id=1
Authorization: Bearer <your-jwt-token>
```

### Contact API

```bash
POST /api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello, I'd like to collaborate!"
}
```

## 🚀 Deployment

### Vercel Deployment

1. **Push to GitHub**

   ```bash
   git add .
   git commit -m "Initial portfolio commit"
   git push origin main
   ```

2. **Deploy to Vercel**

   - Connect your GitHub repository to Vercel
   - Vercel will automatically detect Next.js
   - Deploy with default settings

3. **Environment Variables** (if needed)
   - Add any environment variables in Vercel dashboard
   - For PostgreSQL, add database connection strings

### Manual Deployment

1. **Build the project**

   ```bash
   npm run build
   ```

2. **Start production server**
   ```bash
   npm start
   ```

## 🎯 Task Requirements Met

✅ **Next.js with TypeScript**: Latest version with full TypeScript support  
✅ **Tailwind CSS**: Responsive design with utility classes  
✅ **Responsive Design**: Mobile and desktop optimized  
✅ **GSAP Animations**: Creative scroll and hover animations  
✅ **Reusable Components**: Modular component architecture  
✅ **Project Management UI**: Admin interface for CRUD operations  
✅ **Dynamic Projects**: API-driven project data  
✅ **State Management**: React Context for data management  
✅ **Clean Code**: Well-commented, readable code  
✅ **Deployment Ready**: Vercel deployment configuration

## 🔧 Customization

### Adding New Projects

1. Click the "Admin" button in the projects section
2. Use the API endpoints with authentication
3. Projects will automatically update in the UI

### Modifying Animations

- Edit GSAP animations in component `useEffect` hooks
- Adjust ScrollTrigger settings for scroll animations
- Modify hover effects in component styles

### Styling Changes

- Update Tailwind classes in components
- Modify color scheme in `globals.css`
- Adjust responsive breakpoints as needed

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🎨 Color Palette

- **Primary**: Gray-900 (#111827)
- **Secondary**: Gray-800 (#1F2937)
- **Accent**: Pink-400 (#F472B6)
- **Text**: White (#FFFFFF), Gray-300 (#D1D5DB)

## 📄 License

This project is created for the Binary Digits Junior Full Stack Developer position assessment.

---

**Note**: This is a test task with fictional design and content. The portfolio showcases technical skills, creativity, and problem-solving approach.
