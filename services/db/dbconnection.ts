import mongoose from "mongoose";

const DB_URL: any = process.env.MONGODB_URL;

mongoose.connect(DB_URL);
