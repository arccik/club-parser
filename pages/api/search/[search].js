import dbConnect from "../../../src/utils/dbConnect";
import Event from "../../../src/models/event-model";
import formatLocations from "../../../src/utils/formatLocations";
import Venue from "../../../src/models/venue-model";

export default async function handler(req, res) {
  await dbConnect();
  try {
    if (req.method === "GET") {
      const searchString = req.query.search;
      if (!searchString) return res.send("ok");

      const eventResponse = await Event.find({
        startdate: { $gt: new Date() },
        $text: { $search: searchString },
      }).select("name description image _id placeType");
      const venueResponse = await Venue.find({
        $text: { $search: searchString },
      }).select("name description image _id placeType");

      let response = [...eventResponse, ...venueResponse];

      return res.status(200).json(response);
    }
  } catch (error) {
    return res.status(503).json({ message: "Issue with server" });
  }

  return res.status(404).json({ message: "Wrong request method!" });
}
