import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
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
},
userId : {
  type : mongoose.Schema.Types.ObjectId,
  required : true
}

});

export default mongoose.model("Todo", todoSchema);