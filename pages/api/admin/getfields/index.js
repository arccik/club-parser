import Event from "../../../../src/models/event-model";
import Venue from "../../../../src/models/venue-model";

export default async function handler(req, res) {
  try {
    const { type } = req.query;
    if (!type) return res.status(404).json({ message: "Type is required" });
    if (type === "events" || type === "event") {
      const fields = Object.keys(Event.schema.tree).filter(
        (v) =>
          ![
            "eventId",
            "_id",
            "id",
            "__v",
            "updatedAt",
            "createdAt",
            "views",
            "location",
            "ratedIPs",
          ].includes(v)
      );
      return res.status(200).send(fields);
    }
    if (type === "venues" || type === "venue") {
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
            "location",
            "town",
            "ratedIPs",
          ].includes(v)
      );
      return res.status(200).send(fields);
    }
    return res.status(404).json({ message: "Wrong field type" });
  } catch (error) {
    return res.status(503).json({ message: "Couldn't get Fields", error });
  }
}
