export interface User {
  firstName: string;
  lastName: string;
  email: string;
  roles: "student" | "admin";
  age?: number;
  course?: string;
  profilePicture?: string;
}
