import dbConnect from "../../../src/utils/dbConnect";
import Event from "../../../src/models/event-model";
import Venue from "../../../src/models/venue-model";

export default async function handler(req, res) {
  try {
    await dbConnect();
    if (req.method === "PUT") {
      const forwarded = req.headers["x-forwarded-for"];
      const ip = forwarded
        ? forwarded.split(/, /)[0]
        : req.connection.remoteAddress;

      const { type, id, score } = req.query;
      if (type === "event") {
        const event = await Event.findById(id);
        event.rating.push(score);
        event.ratedIPs.push(ip);
        await event.save();
        return res.status(200).json({ message: `${type} rated ${score}` });
      } else if (type === "venue") {
        const venue = await Venue.findById(id);
        venue.rating.push(score);
        venue.ratedIPs.push(ip);
        await venue.save();
        return res.status(200).json(venue);
      }
      return res.status(200).json({ message: "all OK" });
    }
    return res.status(404).json({ message: "Cannot find the Place to vote" });
  } catch (error) {
    return res.status(503).json({ message: "Issue with server" });
  }
}
