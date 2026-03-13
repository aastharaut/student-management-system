import express, { Request, Response } from "express";
import "./connections/database";
import appRoutes from "./routes/auth";
import resourceNotFoundHandler from "./middleware/resourceNotFoundHandler";
import errorHandler from "./middleware/errorHandler";
import studentRoutes from "./routes/student";
import "./models/User";
import cors from "cors";
import "dotenv/config";
import adminRoutes from "./routes/admin";
//import path from "path";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://student-management-system-aastha-rauts-projects.vercel.app", //frontend URL
    ],
    credentials: true,
  }),
);
//app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
console.log("JWT_SECRET loaded:", process.env.JWT_SECRET ? "Yes" : "No");

// auth routes directly at /api rather than /api/auth
app.use("/api", appRoutes);
app.use("/api/student", studentRoutes); // For /api/students
app.use("/api/admin", adminRoutes); //for admin routes

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});
app.use(resourceNotFoundHandler);
app.use(errorHandler);

if (process.env.NODE_ENV !== "production") {
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
}

export default app;
