export interface NavLink {
  path: string;
  label: string;
  requiresAuth?: boolean;
  roles?: ("admin" | "teacher" | "viewer")[]; // For role-based access
}

export interface User {
  id: string;
  name: string;
  role: "admin" | "teacher" | "viewer";
}
