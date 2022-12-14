import dbConnect from "../../../src/utils/dbConnect";
import Event from "../../../src/models/event-model";
import formatLocations from "../../../src/utils/formatLocations";
import Venue from "../../../src/models/venue-model";

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const searchString = req.query.search;

      await dbConnect();

      const eventResponse = await Event.find({
        name: { $regex: searchString, $options: "i" },
      });
      const venueResponse = await Venue.find({
        name: { $regex: searchString },
      });
      const reponse = [...eventResponse, ...venueResponse];
      return res.status(200).json(reponse);
    }
  } catch (error) {
    return res.status(503).json({ message: "Issue with server" });
  }

  return res.status(404).json({ message: "Wrong request method!" });
}
