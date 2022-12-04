import dbConnect from "../../../utils/dbConnect";
import Event from "../../../models/event-model";
import Venue from "../../../models/venue-model";

export default async function handler(req, res) {
  try {
    await dbConnect();
    const id = req.query.id;
    switch (req.method) {
      case "GET":
        const event = Event.findById(id);
        res.status(200).json(event);
        break;
      case "PUT":
        const updatedEvent = await Event.findOneAndUpdate(id, {
          $inc: {
            rating: 1,
          },
        });
        res.status(200).json(updatedEvent);
        break;
      default:
        res.status(404).json({ message: "Wrong request method!" });
        break;
    }
  } catch (error) {
    return res.status(503).json({ message: "Issue with server" });
  }
}
