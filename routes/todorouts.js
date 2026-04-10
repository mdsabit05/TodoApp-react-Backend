import express from "express";
import Todo from "../models/todo.js";
import verifyToken from "../Middleware/auth.js";

const router = express.Router();

router.post("/", verifyToken, async (req, res) => {
  try {
    const { text, category, due_date } = req.body;

    if (!text || text.trim() === "") {
      return res.status(400).json({ message: "Text is required" });
    }

    const newTodo = new Todo({
      text,
      category,
      due_date,
      userId: req.user.id,
    });

    const saved = await newTodo.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/", verifyToken, async (req, res) => {
  try {
    const { status, category } = req.query;

    let filter = { userId: req.user.id };

    if (status === "pending") {
      filter.completed_at = null;
    }

    if (status === "completed") {
      filter.completed_at = { $ne: null };
    }

    if (category && category !== "all") {
      filter.category = category;
    }

    const todos = await Todo.find(filter);
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id/toggle", verifyToken, async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: "Not found" });
    }
    if (todo.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not allowed" });
    }
    todo.completed_at = todo.completed_at ? null : new Date();

    const updated = await todo.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", verifyToken, async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo || todo.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not allowed" });
    }

    Object.assign(todo, req.body);
    const updated = await todo.save();

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: "Not found" });
    }

    if (todo.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not allowed" });
    }
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
