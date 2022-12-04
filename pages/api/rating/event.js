import dbConnect from "../../../src/utils/dbConnect";
import Event from "../../../src/models/event-model";
import Venue from "../../../src/models/venue-model";

export default async function handler(req, res) {
  try {
    await dbConnect();
    const id = req.query.id;
    switch (req.method) {
      case "GET":
        const event = await Event.findById(id);

        return res.status(200).json({ rating: event.rating });
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
    return res.status(503).json({ message: "Issue with server", error });
  }
}
