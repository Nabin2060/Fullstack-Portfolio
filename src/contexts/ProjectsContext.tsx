"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode
} from "react";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  link: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ProjectsContextType {
  projects: Project[];
  loading: boolean;
  error: string | null;
  addProject: (
    project: Omit<Project, "id" | "createdAt" | "updatedAt">
  ) => Promise<void>;
  updateProject: (id: number, project: Partial<Project>) => Promise<void>;
  deleteProject: (id: number) => Promise<void>;
  refreshProjects: () => Promise<void>;
}

const ProjectsContext = createContext<ProjectsContextType | undefined>(
  undefined
);

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

export function ProjectsProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch projects from API
  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/projects`);
      const result = await response.json();

      if (result.success) {
        setProjects(result.data);
        setError(null);
      } else {
        setError(result.message || "Failed to fetch projects");
      }
    } catch (err) {
      console.error("Error fetching projects:", err);
      setError("Failed to fetch projects");
    } finally {
      setLoading(false);
    }
  };

  // Add new project
  const addProject = async (
    project: Omit<Project, "id" | "createdAt" | "updatedAt">
  ) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(project)
      });

      const result = await response.json();

      if (result.success) {
        await fetchProjects();
        setError(null);
      } else {
        setError(result.message || "Failed to add project");
      }
    } catch (err) {
      console.error("Error adding project:", err);
      setError("Failed to add project");
    } finally {
      setLoading(false);
    }
  };

  // Update project
  const updateProject = async (id: number, updates: Partial<Project>) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/projects`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ id, ...updates })
      });

      const result = await response.json();

      if (result.success) {
        await fetchProjects();
        setError(null);
      } else {
        setError(result.message || "Failed to update project");
      }
    } catch (err) {
      console.error("Error updating project:", err);
      setError("Failed to update project");
    } finally {
      setLoading(false);
    }
  };

  // Delete project
  const deleteProject = async (id: number) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/projects?id=${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      const result = await response.json();

      if (result.success) {
        await fetchProjects();
        setError(null);
      } else {
        setError(result.message || "Failed to delete project");
      }
    } catch (err) {
      console.error("Error deleting project:", err);
      setError("Failed to delete project");
    } finally {
      setLoading(false);
    }
  };

  // Refresh projects
  const refreshProjects = async () => {
    await fetchProjects();
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const value = {
    projects,
    loading,
    error,
    addProject,
    updateProject,
    deleteProject,
    refreshProjects
  };

  return (
    <ProjectsContext.Provider value={value}>
      {children}
    </ProjectsContext.Provider>
  );
}

export function useProjects() {
  const context = useContext(ProjectsContext);
  if (context === undefined) {
    throw new Error("useProjects must be used within a ProjectsProvider");
  }
  return context;
}
