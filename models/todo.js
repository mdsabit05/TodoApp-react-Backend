import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  category: {
    type: String,
  },
  due_date: {
    type: Date,
  },
  completed_at: {
    type: Date,
    default: null,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  category: {
  type: String,
  default: "general"
}
});

export default mongoose.model("Todo", todoSchema);