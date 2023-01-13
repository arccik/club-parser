import dbConnect from "../../../../src/utils/dbConnect";
import Message from "../../../../src/models/message-model";

export default async function handler(req, res) {
  try {
    if (req.method === "POST" && req.body) {
      await dbConnect();
      const body = req.body;
      await Message.create({
        name: body.name,
        email: body.email,
        subject: body.subject,
        message: body.message,
      });
      return res.status(200).json({ message: "Message Sent!", status: "OK" });
    }
    return res.status(404).json({ message: "Wasn't able to save message" });
  } catch (error) {
    console.log("Could not set form");
    return res
      .status(503)
      .json({ message: "Couldn't send form, please try again letter" });
  }
}
