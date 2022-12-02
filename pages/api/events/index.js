import dbConnect from "../../../utils/dbConnect";
import Event from "../../../models/event-model";
export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      await dbConnect();
      const response = await Event.find().limit(40);
      return res.status(200).json(response);
    }
  } catch (error) {
    return res.status(503).json({ message: "Issue with server" });
  }

  return res.status(404).json({ message: "Wrong request method!" });
}
