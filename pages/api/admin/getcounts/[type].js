import Event from "../../../../src/models/event-model";
import Venue from "../../../../src/models/venue-model";
import dbConnect from "../../../../src/utils/mongodbConnect";

export default async function handler(req, res) {
  const { type } = req.query;
  if (!type) {
    return res
      .status(404)
      .json({ message: "Please provide Type (event or venue)" });
  }
  await dbConnect();

  switch (type) {
    case "events":
      return res
        .status(200)
        .json({ totalCount: await Event.countDocuments({}).exec() });
    case "venues":
      return res
        .status(200)
        .json({ totalCount: await Venue.countDocuments({}).exec() });
    default:
      break;
  }
  return res.status(200).json({ message: "Please provide type" });
}
