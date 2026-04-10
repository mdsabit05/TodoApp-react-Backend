import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email : {
    type : String,
    required : true, // mendotory
    unique : true // no email repeate
  },
  password : {
    type: String,
    required : true,
  }
});

const user = mongoose.model("user" , userSchema);

export default user;