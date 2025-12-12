// ==========================
// routes/taskRoutes.js
// ==========================
import express from "express";
import { createTask, getTasks, approveTask, rejectTask } from "../controllers/taskController.js";
import { auth, adminOnly } from "../middleware/auth.js";
import { validateTaskCreation } from "../middleware/validators.js";


const router = express.Router();
router.post("/", auth, validateTaskCreation, createTask);
router.get("/", auth, getTasks);
router.patch("/:id/approve", auth, adminOnly, approveTask);
router.patch("/:id/reject", auth, adminOnly, rejectTask);
export default router;