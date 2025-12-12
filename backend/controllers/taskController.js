// ==========================
// controllers/taskController.js
// ==========================
import Task from "../models/Task.js";


export const createTask = async (req, res) => {
    try {
        const task = await Task.create({ ...req.body, createdBy: req.user.id });
        res.status(201).json(task);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


export const getTasks = async (req, res) => {
    const tasks = await Task.find({ createdBy: req.user.id });
    res.json(tasks);
};


export const approveTask = async (req, res) => {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });
    if (task.isLocked) return res.status(400).json({ error: "Task already processed" });


    task.status = "approved";
    await task.save();
    res.json(task);
};


export const rejectTask = async (req, res) => {
    const { reason } = req.body;
    if (!reason) return res.status(400).json({ error: "Rejection reason required" });


    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });
    if (task.isLocked) return res.status(400).json({ error: "Task already processed" });


    task.status = "rejected";
    task.rejectionReason = reason;
    await task.save();
    res.json(task);
};