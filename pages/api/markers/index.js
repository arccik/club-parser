import dbConnect from "../../../src/utils/dbConnect";
import Event from "../../../src/models/event-model";
import formatLocations from "../../../src/utils/formatLocations";
export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      await dbConnect();
      const response = await Event.find()
        .select("name location image description open close placeType")
        .limit(40);
      const data = formatLocations(response);
      return res.status(200).json(data);
    }
  } catch (error) {
    return res.status(503).json({ message: "Issue with server" });
  }

  return res.status(404).json({ message: "Wrong request method!" });
}
