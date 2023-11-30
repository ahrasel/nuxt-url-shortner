import mongoose from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;
  avatar?: string;
  username: string;
  urls?: mongoose.Schema.Types.ObjectId[];
}

const Schema = mongoose.Schema;

const userSchema = new Schema<IUser>({
  name: { type: String, required: [true, "Name is required"] },
  email: { type: String, required: [true, "Email is required"], unique: true },
  password: { type: String, required: [true, "Password is required"] },
  avatar: { type: String, required: false, unique: true, sparse: true },
  username: { type: String, required: [true, "Username is required"], unique: true },
  urls: [{ type: mongoose.Schema.Types.ObjectId, ref: "Url", required: false }],
});

const User = mongoose.model("User", userSchema);

export default User;
