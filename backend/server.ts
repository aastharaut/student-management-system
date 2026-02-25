import express, { Request, Response } from "express";
import "./connections/database";
import appRoutes from "./routes/auth";
import resourceNotFoundHandler from "./middleware/resourceNotFoundHandler";
import errorHandler from "./middleware/errorHandler";
//import studentRoutes from "./routes/student";

//checkDatabaseConnection();
const app = express();
app.use(express.json()); //global middleware to parse JSON bodies

app.use("/api", appRoutes);
//app.use("/api", studentRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});
app.use(resourceNotFoundHandler);
app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
