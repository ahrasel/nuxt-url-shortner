import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: [true, "Name is required"] },
  email: { type: String, required: [true, "Email is required"], unique: true },
  password: { type: String, required: [true, "Password is required"] },
  avatar: { type: String, required: false },
  userName: { type: String, required: [true, "Username is required"] },
});

const User = mongoose.model("User", userSchema);

export default User;
