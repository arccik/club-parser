import dbConnect from "../../../src/utils/dbConnect";
import Event from "../../../src/models/event-model";
import Venue from "../../../src/models/venue-model";

export default async function handler(req, res) {
  try {
    await dbConnect();
    const { type, page } = req.query;

    const PAGE_LIMIT = 12;
    const startIndex = (Number(page) - 1) * PAGE_LIMIT;
    if (type) {
      const filter = { startdate: { $gt: new Date() } };
      const genre = type.replace(",", "/");
      const eventCount = await Event.countDocuments(filter)
        .where("genres")
        .in(genre);
      const venueCount = await Venue.countDocuments(filter)
        .where("genres")
        .in(genre);
      const numberOfPages = Math.ceil((eventCount + venueCount) / PAGE_LIMIT);
      const events = await Event.find(filter)
        .where("genres")
        .in(genre)
        .limit(PAGE_LIMIT)
        .skip(startIndex);
      const venues = await Venue.find()
        .where("genres")
        .in(genre)
        .limit(PAGE_LIMIT)
        .skip(startIndex);
      const places = [...events, ...venues];
      return res.status(200).json({
        places,
        currentPage: Number(page),
        numberOfPages,
      });
    }
    return res.status(404).json({ message: "Please provide genre" });
  } catch (error) {
    console.log("Could not get genres", error);
    return res.status(404).json({ message: "Could not get genres", error });
  }
}
