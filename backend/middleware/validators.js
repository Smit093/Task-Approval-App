// ==========================
// middleware/validators.js
// ==========================
export const validateTaskCreation = (req, res, next) => {
const { title, description } = req.body;
if (!title || title.length < 3) return res.status(400).json({ error: "Title >= 3 chars" });
if (!description || description.length < 10) return res.status(400).json({ error: "Description >= 10 chars" });
next();
};