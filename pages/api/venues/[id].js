import dbConnect from "../../../src/utils/dbConnect";
import Venue from "../../../src/models/venue-model";
export default async function handler(req, res) {
  try {
    await dbConnect();
    const { id } = req.query;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(404).json({ message: "ID is not valid" });
    }
    switch (req.method) {
      case "GET":
        const data = await Venue.findById(id);
        return res.status(200).json(data);
      case "POST":
        const body = req.body;
        if (!body) {
          return res
            .status(200)
            .json({ message: "Please provide Venue Details" });
        }
        const created = await Venue.create(body);
        return res.status(200).json({ message: "Venue Created", created });
      case "DELETE":
        const deletedVenue = await Venue.deleteOne({ _id: id });
        return res.status(200).json({ message: "Venue deleted", deletedVenue });
      default:
        return res.status(404).json({ message: "Method not recognised" });
    }
  } catch (error) {
    return res
      .status(503)
      .json({ message: "Oh, no something went wrong on server", error });
  }

}
