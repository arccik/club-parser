import dbConnect from "../../../../src/utils/dbConnect";
import Event from "../../../../src/models/event-model";
import Venue from "../../../../src/models/venue-model";
import Artist from "../../../../src/models/artist-model";

export default async function handler(req, res) {
  try {
    await dbConnect();

    const { page } = req.query;
    const { coords } = req.query;
    const PAGE_LIMIT = 12;
    const startIndex = (Number(page) - 1) * PAGE_LIMIT;

    switch (req.method) {
      case "GET":
        if (page) {
          const eventTotal = await Event.countDocuments({});
          const events = await Event.find({})
            .sort({ startdate: -1 })
            .limit(PAGE_LIMIT)
            .skip(startIndex);
          return res.status(200).json({
            events,
            currentPage: Number(page),
            numberOfPages: Math.ceil(eventTotal / PAGE_LIMIT),
          });
        }
        if (coords) {
          const location = coords.split(",").map(Number);

          const eventsWithDistance = await Event.aggregate([
            {
              $geoNear: {
                near: {
                  type: "Point",
                  coordinates: location,
                },
                maxDistance: 1000 * 10000,
                spherical: true,
                distanceField: "distance",
                distanceMultiplier: 0.001,
              },
            },
            {
              $match: {
                startdate: { $gt: new Date() },
              },
            },
            { $limit: 10 },
          ]);
          await Artist.populate(eventsWithDistance, {
            path: "artists",
            model: Artist,
          });
          await Venue.populate(eventsWithDistance, {
            path: "venue",
            model: Venue,
          });

          return res.status(200).json(eventsWithDistance);
        } else {
          const events = await Event.find({}).limit(10);
          return res.status(200).json(events);
        }

      case "POST":
        const body = req.body;
        if (!body) {
          return res
            .status(200)
            .json({ message: "Please provide Event Details" });
        }
        const created = await Event.create(body);
        if (created)
          return res
            .status(200)
            .json({ status: "OK", message: "Event Created", created });
        else
          return res
            .status(503)
            .json({ message: "Error during saving, check DB connection" });
      default:
        return res.status(404).json({ message: "wrong request method!" });
    }
  } catch (error) {
    return res
      .status(503)
      .json({ message: "Cannnot get Event API to work, Issue with server" });
  }
}
