import Event from "../../../../src/models/event-model";
import Venue from "../../../../src/models/venue-model";

export default async function handler(req, res) {
  try {
    const { type } = req.query;
    if (!type) return res.status(404).json({ message: "Type is required" });
    if (type === "events")
      return res.status(200).send(Object.keys(Event.schema.tree));
    if (type === "venues") {
      const fields = Object.keys(Venue.schema.tree).filter(
        (v) =>
          ![
            "_id",
            "id",
            "__v",
            "venueId",
            "views",
            "distance",
            "rating",
            "type",
            "createdAt",
            "updatedAt",
          ].includes(v)
      );
      return res.status(200).send(fields);
    }
    return res.status(404).json({ message: "Wrong field type" });
  } catch (error) {
    return res.status(503).json({ message: "Couldn't get Fields", error });
  }
}
