import dbConnect from "../../../src/utils/dbConnect";
import Event from "../../../src/models/event-model";
import Venue from "../../../src/models/venue-model";

export default async function handler(req, res) {
  try {
    await dbConnect();
    const { type } = req.query;
    if (type) {
      const events = await Event.find({ startdate: { $gt: new Date() } })
        .where("genres")
        .in(type);
      const venues = await Venue.find().where("genres").in(type);
      const data = [...events, ...venues];
      return res.status(200).json(data);
    }
    return res.status(404).json({ message: "Please provide genre" });
  } catch (error) {
    console.log("Could not get genres", error);
    return res.status(404).json({ message: "Could not get genres", error });
  }
}
