import * as express from "express";
import { Request, Response } from "express";
import * as cron from "node-cron";
import * as path from "path";
import * as dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import { resourceRoutes } from "./routes/resource-routes";
import { userRoutes } from "./routes/user-routes";
import { cleanupExpiredResources } from "./jobs/resource-cleanup-job";
import { errorHandler } from "./middlewares/error";
import { AppDataSource } from "./db/data-source";
import "reflect-metadata";

dotenv.config();

const app = express();

const limiter = rateLimit({
  max: 200,
  windowMs: 60 * 60 * 1000,
  message: "Too many request from this IP",
});

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "uploads")));
app.use(helmet());
app.use(limiter);

// Routes
app.use("/api", resourceRoutes);
app.use("/auth", userRoutes);

// Start cleanup job to run every minute
cron.schedule("* * * * *", cleanupExpiredResources);

const PORT = process.env.PORT || 5000;

app.get("*", (req: Request, res: Response) => {
  res.status(505).json({ message: "Bad Request" });
});

process.on("uncaughtException", function (err) {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});

process.on("unhandledRejection", (msg: string, p: Promise<any>) => {
  console.error("Unhandled Rejection at:", p, "reason:", msg);
  process.exit(1);
});

// error handler
app.use(errorHandler);

AppDataSource.initialize()
  .then(async () => {
    app.listen(PORT, () => {
      console.log("Server is running on http://localhost:" + PORT);
    });
    console.log("Data Source has been initialized!");
  })
  .catch((error) => console.log(error));
