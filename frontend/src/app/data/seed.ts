import type { Task, Release, Column } from "../types";

export const columns: Column[] = [
  { id: "backlog", title: "Backlog", icon: "\u25C7", color: "#3F506A" },
  { id: "todo", title: "To Do", icon: "\u25CB", color: "#38BDF8" },
  { id: "test_case", title: "Test Case", icon: "\u270E", color: "#22D3EE" },
  { id: "in_progress", title: "In Progress", icon: "\u25D0", color: "#FBBF24" },
  { id: "dev_done", title: "Dev Done", icon: "\u25D1", color: "#34D399" },
  { id: "test_case_check_done", title: "Test Case Check Done", icon: "\u2713", color: "#10B981" },
  { id: "dev_fail", title: "Dev Fail", icon: "\u2715", color: "#FB7185" },
  { id: "completed", title: "Completed", icon: "\u25CF", color: "#22C55E" },
];

export const teamMembers = [
  { id: 1, name: "Arjun", avatar: "AM" },
  { id: 2, name: "Sara", avatar: "SC" },
  { id: 3, name: "Kai", avatar: "KT" },
  { id: 4, name: "Mira", avatar: "MP" },
  { id: 5, name: "Leo", avatar: "LR" },
  { id: 6, name: "Jordan", avatar: "JD" },
];

export const initialReleases: Release[] = [
  { id: 1, name: "v3.2.0 Core Platform", color: "#34D399" },
  { id: 2, name: "v3.3.0 Analytics Suite", color: "#38BDF8" },
  { id: 3, name: "v4.0.0 Mobile Redesign", color: "#A78BFA" },
];

export const initialTasks: Task[] = [
  // Backlog
  {
    id: 1, release: "v3.2.0", releaseColor: "#34D399",
    title: "Real-time websocket infrastructure",
    tags: ["backend", "infrastructure"], timeSpent: 0, timeEstimate: 20,
    priority: "Med", avatar: "JD", tracking: false, status: "backlog",
  },
  {
    id: 2, release: "v3.3.0", releaseColor: "#38BDF8",
    title: "Data export functionality",
    tags: ["backend", "feature"], timeSpent: 0, timeEstimate: 12,
    priority: "Low", avatar: "SC", tracking: false, status: "backlog",
  },
  {
    id: 3, release: "v4.0.0", releaseColor: "#A78BFA",
    title: "Mobile navigation redesign",
    tags: ["frontend", "ui"], timeSpent: 0, timeEstimate: 16,
    priority: "Med", avatar: "LR", tracking: false, status: "backlog",
  },
  // To Do
  {
    id: 4, release: "v3.2.0", releaseColor: "#34D399",
    title: "User authentication flow",
    tags: ["backend", "security"], timeSpent: 0, timeEstimate: 12,
    priority: "High", avatar: "MP", tracking: false, status: "todo",
  },
  {
    id: 5, release: "v3.3.0", releaseColor: "#38BDF8",
    title: "Dashboard widget system",
    tags: ["frontend", "feature"], timeSpent: 0, timeEstimate: 8,
    priority: "Med", avatar: "KT", tracking: false, status: "todo",
  },
  // In Progress
  {
    id: 6, release: "v3.2.0", releaseColor: "#34D399",
    title: "API rate limiting middleware",
    tags: ["backend", "security"], timeSpent: 4, timeEstimate: 6,
    priority: "High", avatar: "KT", tracking: false, status: "in_progress",
  },
  {
    id: 7, release: "v3.3.0", releaseColor: "#38BDF8",
    title: "Real-time analytics engine",
    tags: ["backend", "analytics"], timeSpent: 7, timeEstimate: 16,
    priority: "High", avatar: "AM", tracking: false, status: "in_progress",
  },
  {
    id: 8, release: "v3.2.0", releaseColor: "#34D399",
    title: "Database migration scripts",
    tags: ["backend", "infrastructure"], timeSpent: 3, timeEstimate: 5,
    priority: "Med", avatar: "MP", tracking: false, status: "in_progress",
  },
  {
    id: 9, release: "v3.2.0", releaseColor: "#34D399",
    title: "OAuth integration testing",
    tags: ["backend", "testing"], timeSpent: 5, timeEstimate: 6,
    priority: "Med", avatar: "SC", tracking: false, status: "in_progress",
  },
  {
    id: 10, release: "v4.0.0", releaseColor: "#A78BFA",
    title: "Component library setup",
    tags: ["frontend", "infrastructure"], timeSpent: 8, timeEstimate: 10,
    priority: "High", avatar: "LR", tracking: false, status: "in_progress",
  },
  // Dev Done
  {
    id: 11, release: "v3.2.0", releaseColor: "#34D399",
    title: "Project scaffolding",
    tags: ["infrastructure"], timeSpent: 4, timeEstimate: 4,
    priority: "Low", avatar: "AM", tracking: false, status: "dev_done",
  },
  {
    id: 12, release: "v3.2.0", releaseColor: "#34D399",
    title: "API documentation",
    tags: ["documentation"], timeSpent: 6, timeEstimate: 6,
    priority: "Low", avatar: "JD", tracking: false, status: "dev_done",
  },
  // Test Case
  {
    id: 13, release: "v3.2.0", releaseColor: "#34D399",
    title: "Write auth flow test cases",
    tags: ["testing", "security"], timeSpent: 2, timeEstimate: 5,
    priority: "High", avatar: "SC", tracking: false, status: "test_case",
  },
  {
    id: 14, release: "v3.3.0", releaseColor: "#38BDF8",
    title: "Analytics dashboard test plan",
    tags: ["testing", "analytics"], timeSpent: 1, timeEstimate: 4,
    priority: "Med", avatar: "KT", tracking: false, status: "test_case",
  },
  // Test Case Check Done
  {
    id: 15, release: "v3.2.0", releaseColor: "#34D399",
    title: "Rate limiter integration tests verified",
    tags: ["testing", "backend"], timeSpent: 3, timeEstimate: 3,
    priority: "Med", avatar: "MP", tracking: false, status: "test_case_check_done",
  },
  {
    id: 16, release: "v3.2.0", releaseColor: "#34D399",
    title: "Database migration rollback tests passed",
    tags: ["testing", "infrastructure"], timeSpent: 2, timeEstimate: 2,
    priority: "Med", avatar: "AM", tracking: false, status: "test_case_check_done",
  },
  // Dev Fail
  {
    id: 17, release: "v4.0.0", releaseColor: "#A78BFA",
    title: "Mobile nav gesture handling regression",
    tags: ["frontend", "bug"], timeSpent: 6, timeEstimate: 4,
    priority: "High", avatar: "LR", tracking: false, status: "dev_fail",
  },
  // Completed
  {
    id: 18, release: "v3.2.0", releaseColor: "#34D399",
    title: "CI/CD pipeline setup",
    tags: ["infrastructure", "devops"], timeSpent: 8, timeEstimate: 8,
    priority: "Med", avatar: "JD", tracking: false, status: "completed",
  },
  {
    id: 19, release: "v3.2.0", releaseColor: "#34D399",
    title: "Environment configuration management",
    tags: ["infrastructure", "devops"], timeSpent: 3, timeEstimate: 3,
    priority: "Low", avatar: "SC", tracking: false, status: "completed",
  },
];
