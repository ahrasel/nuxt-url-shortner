import mongoose from "mongoose";

export interface IUrl {
  url: string;
  slug: string;
  clicks: number;
  user: mongoose.Schema.Types.ObjectId;
  urls: mongoose.Schema.Types.ObjectId[];
}

const Schema = mongoose.Schema;

const urlSchema = new Schema<IUrl>({
  url: { type: String, required: [true, "URL is required"] },
  slug: { type: String, required: [true, "Slug is required"], unique: true },
  clicks: { type: Number, required: false, default: 0 },
  user: { type: mongoose.Schema.Types.ObjectId, required: [true, "User is required"], ref: "User" },
  urls: [{ type: mongoose.Schema.Types.ObjectId, ref: "Url" }],
});

const Url = mongoose.model("Url", urlSchema);

export default Url;
