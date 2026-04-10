import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import todoRoutes from "./routes/todorouts.js";
import userRoutes from "./routes/userRoutes.js"

// dotenv.config();
dotenv.config({ path: "./.env" });

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// connect DB
connectDB();

// routes
app.use("/api/todos", todoRoutes);

// test route
app.get("/", (req, res) => {
  res.send("Todo API running");
});
app.use("/api/auth", userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});