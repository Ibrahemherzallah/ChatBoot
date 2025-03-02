import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  gender: {
    type: String,
    required: true,
    enum: ["MALE","FEMALE"]
  },
  profImg: {
    type: String,
    default: ""
}},{timestamps: true});

const User = mongoose.model("User",userSchema);

export default User;