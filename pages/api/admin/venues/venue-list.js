import dbConnect from "../../../../src/utils/dbConnect";
import Venue from "../../../../src/models/venue-model";
export default async function handler(req, res) {
  try {
    await dbConnect();
    if (req.method === "GET") {
      const venues = await Venue.find({});
      const response = venues.map((venue) => ({
        label: venue.name,
        value: venue._id,
      }));
      return res.status(200).json(response);
    } else {
      return res.status(404).json({ message: "Wrong request Method" });
    }
  } catch (error) {
    return res
      .status(503)
      .json({ message: "Request went wrong, please try again", errro });
  }
}
