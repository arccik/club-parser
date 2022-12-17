import dbConnect from "../../../../src/utils/dbConnect";
import Event from "../../../../src/models/event-model";
export default async function handler(req, res) {
  try {
    const { id } = req.query;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(404).json({ message: "ID is not valid" });
    }
    await dbConnect();
    switch (req.method) {
      case "GET":
        const data = await Event.findById(id);
        return res.status(200).json(data);

      case "PUT":
        if (!req.body) {
          return res
            .status(200)
            .json({ message: "Couldn't found Venue Details" });
        }
        const updatedEvent = await Event.findByIdAndUpdate(id, req.body);
        return res
          .status(200)
          .json({ status: "OK", message: "Event Updated!", updatedEvent });

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
