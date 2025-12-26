import { db } from "./db";
import {
  messages,
  projects,
  type InsertMessage,
  type Message,
  type Project,
  type InsertProject,
} from "@shared/schema";
import { desc } from "drizzle-orm";

export interface IStorage {
  createMessage(message: InsertMessage): Promise<Message>;
  getProjects(): Promise<Project[]>;
  seedProjects(): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const [message] = await db
      .insert(messages)
      .values(insertMessage)
      .returning();
    return message;
  }

  async getProjects(): Promise<Project[]> {
    return await db.select().from(projects).orderBy(desc(projects.order));
  }

  async seedProjects(): Promise<void> {
    const existing = await this.getProjects();
    if (existing.length > 0) return;

    const seedData: InsertProject[] = [
      {
        title: "Neon Nexus",
        description: "A futuristic dashboard visualization tool for real-time data monitoring. Features WebGL data clouds and reactive charts.",
        techStack: ["React", "Three.js", "D3.js", "WebSocket"],
        demoUrl: "#",
        repoUrl: "#",
        imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
      },
      {
        title: "CyberCommerce",
        description: "High-performance e-commerce platform with 3D product previews and AI-driven recommendations.",
        techStack: ["Next.js", "Stripe", "PostgreSQL", "Tailwind"],
        demoUrl: "#",
        repoUrl: "#",
        imageUrl: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800",
      },
      {
        title: "RaveChat",
        description: "Decentralized messaging app with end-to-end encryption and ephemeral messages.",
        techStack: ["TypeScript", "Socket.io", "Redis", "Node.js"],
        demoUrl: "#",
        repoUrl: "#",
        imageUrl: "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&q=80&w=800",
      },
      {
        title: "SynthWave Audio",
        description: "Browser-based DAW (Digital Audio Workstation) for creating synthwave tracks using Web Audio API.",
        techStack: ["Vue.js", "Web Audio API", "Canvas", "Firebase"],
        demoUrl: "#",
        repoUrl: "#",
        imageUrl: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=800",
      }
    ];

    await db.insert(projects).values(seedData);
  }
}

export const storage = new DatabaseStorage();
