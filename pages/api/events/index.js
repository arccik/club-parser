import connectMongo from "../../../utils/mongodbConnect";
import Event from "../../../models/event-model";
import Venue from "../../../models/venue-model";
export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      await connectMongo();
      const response = await Venue.find().limit(10);
      return res.status(200).json(response);
    }
  } catch (error) {
    return res.status(503).json({ message: "Issue with server" });
  }

  return res.status(404).json({ message: "Wrong request method!" });
}
