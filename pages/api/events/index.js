import dbConnect from "../../../src/utils/dbConnect";
import Event from "../../../src/models/event-model";
export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      await dbConnect();
      const data = await Event.find().limit(40);
      return res.status(200).json(data);
    }
  } catch (error) {
    return res.status(503).json({ message: "Issue with server" });
  }

  return res.status(404).json({ message: "Wrong request method!" });
}
