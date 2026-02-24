import express, { Request, Response } from "express";
import checkDatabaseConnection from "./connections/database";
import authRoutes from "./routes/auth";
//import studentRoutes from "./routes/student";

checkDatabaseConnection();
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
