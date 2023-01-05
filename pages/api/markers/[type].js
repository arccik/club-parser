import dbConnect from "../../../src/utils/dbConnect";
import Event from "../../../src/models/event-model";
import formatLocations from "../../../src/utils/formatLocations";
import Venue from "../../../src/models/venue-model";

export default async function handler(req, res) {
  const selectedField = "name location image description open close placeType";

  try {
    await dbConnect();
    if (req.method === "GET") {
      const { type } = req.query;
      switch (type) {
        case "events":
          const response = await Event.find({
            startdate: { $gte: new Date() },
          }).select(selectedField);
          return res.status(200).json(response);
        case "venues":
          const venuesResponse = await Venue.find().select(selectedField);
          return res.status(200).json(venuesResponse);
        case "all":
          const data1 = await Event.find().select(selectedField);
          const data2 = await Venue.find().select(selectedField);

          const allData = [...data1, ...data2];
          return res.status(200).json(allData);
        case "bars":
          const barsResponse = await Venue.find()
            .limit(2)
            .select(selectedField);
          return res.status(200).json(barsResponse);
        default:
          return res.status(200).json({ message: "Markers not found!" });
      }
    }
    return { message: "Wrong Request Details" };
  } catch (error) {
    return res.status(503).json({ message: "Issue with server" });
  }
}
