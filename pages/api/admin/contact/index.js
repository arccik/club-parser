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
    } else if(req.method === "GET") {
        const messages = await Message.find({isRead: false})
        return res.status(200).json(messages)
    } else if (req.method === "PUT") {
      const id = req.query.read
      if(id){
        const msg = await Message.findOneAndUpdate({_id: id}, {isRead: true})
        return res.status(200).json({message: `Message with id ${id} marked as read.`, msg})
      } return res.status(404).json({message: 'ID provided does not match with saved messages'})
    }
    return res.status(404).json({ message: "Wasn't able to save message" });
  } catch (error) {
    console.log("Could not set form");
    return res
      .status(503)
      .json({ message: "Couldn't send form, please try again letter" });
  }
}
