import mongoose from "mongoose";

export interface IUrl {
  url: string;
  slug: string;
  clicks: number;
  user: string | null;
}

const Schema = mongoose.Schema;

const urlSchema = new Schema<IUrl>({
  url: { type: String, required: [true, "URL is required"] },
  slug: { type: String, required: [true, "Slug is required"], unique: true },
  clicks: { type: Number, required: false, default: 0 },
  user: { type: String, required: [false, "User is required"] },
});

const Url = mongoose.model("Url", urlSchema);

export default Url;
