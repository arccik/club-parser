import dbConnect from "../../../src/utils/dbConnect";
import Event from "../../../src/models/event-model";
export default async function handler(req, res) {
  try {
    const { id } = req.query;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(404).json({ message: "ID is not valid" });
    }
    await dbConnect();
    switch (req.method) {
      case "GET":
        const data = await Event.findById(id).populate("venue");
        return res.status(200).json(data);
      case "POST":
        const body = req.body;
        if (!body) {
          return res
            .status(200)
            .json({ message: "Please provide Event Details" });
        }
        const created = await Event.create(body);
        return res.status(200).json({ message: "Event Created", created });
      case "DELETE":
        const deletedEvent = await Event.deleteOne({ _id: id });
        return res.status(200).json({ message: "Event deleted", deletedEvent });
      default:
        return res.status(404).json({ message: "Method not recognised" });
    }
  } catch (error) {
    return res
      .status(503)
      .json({ message: "Oh, no something went wrong on server", error });
  }

}
