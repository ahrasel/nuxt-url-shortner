import mongoose from "mongoose";

function connect() {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
    }
    mongoose
      .connect(uri, {
        dbName: process.env.MONGODB_DB,
        user: process.env.MONGODB_USER,
        pass: process.env.MONGODB_PASSWORD,
        authSource: process.env.MONGODB_AUTH_SOURCE,
        serverSelectionTimeoutMS: Number(process.env.MONGODB_SERVER_SELECTION_TIMEOUT_MS),
      })
      .then(() => console.log("Connected to MongoDB"));
  } catch (error) {
    console.log(error);
  }
}

export default connect;
