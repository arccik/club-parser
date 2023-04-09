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

      const { id, score } = req.query;
      const event = await Event.findById(id);
      const venue = await Venue.findById(id);
      const place = event || venue
      if (place && !place.ratedIPs.includes(ip)) {
        place.rating.push(score);
        place.ratedIPs.push(ip);
        await place.save();
        return res.json({ message: `Place Type ${place.placeType} with id ${place._id} updated! ` })
      }
      return res.json({ message: `This ${place.placeType} was rated from your computer` })

    }
    return res.status(404).json({ message: "Wrong Request method" });
  } catch (error) {
    return res.status(503).json({ message: "Issue with server" });
  }
}
