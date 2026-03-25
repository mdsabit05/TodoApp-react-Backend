import express from "express";
import Todo from "../models/todo.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { text, category, due_date } = req.body;

    if (!text || text.trim() === "") {
      return res.status(400).json({ message: "Text is required" });
    }

    const newTodo = new Todo({
      text,
      category,
      due_date,
    });

    const saved = await newTodo.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const { status, category } = req.query;

    let filter = {};

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


router.put("/:id/toggle", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ message: "Not found" });
    }

    todo.completed_at = todo.completed_at ? null : new Date();

    const updated = await todo.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updated = await Todo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router