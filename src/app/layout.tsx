import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ProjectsProvider } from "@/contexts/ProjectsContext";
import { AuthProvider } from "@/contexts/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "John Doe - Portfolio | From Darkness to the Dawn",
  description:
    "Creative portfolio showcasing web development, design, and innovative projects. Welcome to my digital space where ideas take flight.",
  keywords: [
    "portfolio",
    "web development",
    "design",
    "creative",
    "full stack developer"
  ]
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <ProjectsProvider>{children}</ProjectsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
