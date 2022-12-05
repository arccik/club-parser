import dbConnect from "../../../src/utils/dbConnect";
import Event from "../../../src/models/event-model";
import formatLocations from "../../../src/utils/formatLocations";
import Venue from "../../../src/models/venue-model";

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      await dbConnect();
      const eventsResponse = await Event.find().select(
        "name location image description open close placeType"
      );
      const venuesResponse = await Venue.find().select(
        "name location image description open close placeType"
      );

      const data = [...eventsResponse, ...venuesResponse];
      return res.status(200).json(data);
    }
  } catch (error) {
    return res.status(503).json({ message: "Issue with server" });
  }

  return res.status(404).json({ message: "Wrong request method!" });
}
