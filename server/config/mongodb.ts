import mongoose from "mongoose";

function connect() {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
    }
    mongoose
      .connect(uri, {
        dbName: "urls",
        user: "ahrasel",
        pass: "ahrasel",
        authSource: "admin",
        serverSelectionTimeoutMS: 5000,
      })
      .then(() => console.log("Connected to MongoDB"));
  } catch (error) {
    console.log(error);
  }
}

export default connect;
