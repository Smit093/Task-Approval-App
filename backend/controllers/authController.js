// ==========================
// controllers/authController.js
// ==========================
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";


const generateToken = (id, role) => jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "7d" });


export const registerUser = async (req, res) => {
const { name, email, password, role } = req.body;
const existing = await User.findOne({ email });
if (existing) return res.status(400).json({ error: "User exists" });


const hashed = await bcrypt.hash(password, 10);
const user = await User.create({ name, email, password: hashed, role });
res.status(201).json({ token: generateToken(user._id, user.role) });
};


export const loginUser = async (req, res) => {
const { email, password } = req.body;
const user = await User.findOne({ email }).select("+password");
if (!user) return res.status(404).json({ error: "Invalid credentials" });


const match = await bcrypt.compare(password, user.password);
if (!match) return res.status(400).json({ error: "Invalid credentials" });


res.json({ token: generateToken(user._id, user.role) });
};