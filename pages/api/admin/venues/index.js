import dbConnect from "../../../../src/utils/dbConnect";
import Venue from "../../../../src/models/venue-model";



export default async function handler(req, res) {
  const { page, coords } = req.query;
  const PAGE_LIMIT = 21;
  const startIndex = (Number(page) - 1) * PAGE_LIMIT;

  try {
    await dbConnect();
    switch (req.method) {
      case "GET":
        if (page) {
          const venueTotal = await Venue.countDocuments({});
          const venues = await Venue.find({})
            .limit(PAGE_LIMIT)
            .skip(startIndex);
          return res.status(200).json({
            venues,
            currentPage: Number(page),
            numberOfPages: Math.ceil(venueTotal / PAGE_LIMIT),
          });
        }

        if (coords) {
          const location = coords.split(",").map(Number);
          const venues = await Venue.aggregate([
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
          ]).limit(15);
          return res.status(200).json(venues);
        } else {
          const venues = await Venue.find({});
          return res.status(200).json(venues);
        }

      case "POST":
        const body = req.body;
        if (!body) {
          return res
            .status(200)
            .json({ message: "Please provide Venue Details" });
        }
        const created = await Venue.create(body, (error) => {
          if (error) return res.status(503).json({ message: "Corupted Data" });
        });
        return res
          .status(200)
          .json({ status: "OK", message: "Venue Created", created });
      default:
        return res.status(404).json({ message: "Method not recognised" });
    }
  } catch (error) {
    return res
      .status(503)
      .json({ message: "Cannnot get Venue API to work, Issue with server" });
  }
}
