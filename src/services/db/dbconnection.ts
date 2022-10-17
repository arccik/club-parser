import mongoose from "mongoose";

const DB_URL: string | undefined = process.env.MONGODB_URL;

try {
  DB_URL && mongoose.connect(DB_URL, () => console.log("data base connected"));
} catch (error) {
  console.log("Cannot connect to db");
}
