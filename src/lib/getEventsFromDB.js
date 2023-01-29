import dbConnect from "../utils/dbConnect";
import Event from "../models/event-model";
import Venue from "../models/venue-model";
import Artist from "../models/artist-model";

export default async function getEventsByPage(page) {
  try {
    const PAGE_LIMIT = 21;
    const startIndex = (Number(page) - 1) * PAGE_LIMIT;

    await dbConnect();
    const event = await Event.findById(params.id)
      .sort({ startdate: 1 })
      .limit(PAGE_LIMIT)
      .skip(startIndex);
    await Venue.populate(event, {
      path: "venue",
      model: Venue,
    });

    await Artist.populate(event, {
      path: "artists",
      model: Artist,
    });
    return JSON.parse(JSON.stringify(event));
  } catch (error) {
    console.error("event fetching error: ", error);
    return null;
  }
}
