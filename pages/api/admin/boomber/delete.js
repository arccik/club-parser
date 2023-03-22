import dbConnect from "../../../../src/utils/dbConnect";
import Venue from "../../../../src/models/venue-model";

export default async function handler(req, res) {
  await dbConnect();
  try {
    const venues = await Venue.find();

    const result = [];
    const bank = [];

    venues.forEach((venue) => {
      if (!bank.includes(venue.location.coordinates[0])) {
        bank.push(venue.location.coordinates[0]);
        result.push(venue._id);
      }
    });

    return res.status(200).json({ length: result });
  } catch (error) {
    res.status(503).json({ message: "Something went wrong!" });
  }
}
