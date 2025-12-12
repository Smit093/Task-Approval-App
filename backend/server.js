// ==========================
// server.js
// ==========================
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes/index.js";


dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());


app.get("/", (req, res) => res.json({ status: "API running" }));
app.use("/api", routes);


// Error handlers
import { notFound, errorHandler } from "./middleware/error.js";
app.use(notFound);
app.use(errorHandler);


const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;


mongoose
.connect(MONGO_URI)
.then(() => app.listen(PORT, () => console.log(`Server running on ${PORT}`)))
.catch((err) => console.error("DB error", err));