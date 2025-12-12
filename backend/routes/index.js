

// ==========================
// routes/index.js
// ==========================
import express from "express";
import taskRoutes from "./taskRoutes.js";
import authRoutes from "./authRoutes.js";


const router = express.Router();
router.use("/tasks", taskRoutes);
router.use("/auth", authRoutes);
export default router;