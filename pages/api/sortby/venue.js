import dbConnect from "../../../src/utils/dbConnect";
import Venue from "../../../src/models/venue-model";

export default async function handler(req, res) {
  const { sortby, page, coords } = req.query;
  const PAGE_LIMIT = 20;
  const startIndex = (Number(page) - 1) * PAGE_LIMIT;

  try {
    await dbConnect();
    if (sortby === "name" || sortby === "distance") {
      const venueTotal = await Venue.countDocuments();
      const venues = await Venue.find()
        .sort({ [sortby]: 1 })
        .limit(PAGE_LIMIT)
        .skip(startIndex);
      return res.status(200).json({
        venues,
        currentPage: Number(page),
        numberOfPages: Math.ceil(venueTotal / PAGE_LIMIT),
      });
    } else {
      const venueTotal = await Venue.countDocuments();
      const venues = await Venue.find().skip(startIndex).limit(PAGE_LIMIT);
      return res.status(200).json({
        venues,
        currentPage: Number(page),
        numberOfPages: Math.ceil(venueTotal / PAGE_LIMIT),
        total: venueTotal,
      });
    }
  } catch (e) {
    return res
      .status(503)
      .json({ message: "venue cannot be fetched, check admin" });
  }
}
