import { Schema, model, models } from "mongoose";

const MessageSchema = new Schema(
  {
    name: String,
    email: String,
    subject: String,
    message: String,
  },
  { timestamps: true }
);

export default models.Message || model("Message", MessageSchema);
