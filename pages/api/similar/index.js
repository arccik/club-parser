import Venue from "../../../src/models/venue-model";
import dbConnect from "../../../src/utils/dbConnect";
import Event from "../../../src/models/event-model";

export default async function handler(req, res) {
  try {
    await dbConnect();
    const { coords } = req.query;
    const { venueid } = req.query;

    if (venueid) {
      const events = await Event.find({ venue: venueid })
        .sort({ startdate: 1 })
        .limit(5);
      return res.status(200).json(events);
    }

    if (coords) {
      const location = coords.split(",").map(Number);

      const events = await Event.aggregate([
        {
          $geoNear: {
            near: {
              type: "Point",
              coordinates: location,
            },
            maxDistance: 1000 * 1000,
            spherical: true,
            distanceField: "distance",
            distanceMultiplier: 0.001,
          },
        },
      ])
        .sort({ distance: 1 })
        .limit(5);
      const venues = await Venue.aggregate([
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
      ])
        .sort({ distance: 1 })
        .limit(10);
      const result = [...venues, ...events];
      return res.status(200).json(result);
    }
    return await Event.find().sort({ startdate: 1 }).limit(10);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
}
