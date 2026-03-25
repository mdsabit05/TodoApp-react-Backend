import mongoose from "mongoose";

export const connectDB = async () => {
mongoose.connect(process.env.MONGO_URI, {
  family: 4, // 🔥 THIS FIXES SRV DNS ISSUE
})
.then(() => console.log("MongoDB Connected ✅"))
.catch((err) => console.log("DB Error:", err));
};