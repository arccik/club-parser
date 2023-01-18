import Event from "../../../../src/models/event-model";

export default async function handler(req, res) {
  try {
    if (req.method === "PUT") {
      const { id } = req.query;
      if (id) {
        const event = await Event.findByIdAndUpdate(id, { recommended: true });
        return res.status(200).json({ message: "Event Updated, thansk." });
      } else {
        return res.status(404).json({ message: "ID required" });
      }
    } else {
      return res
        .status(404)
        .json({ message: "Please check request params or method" });
    }
  } catch (error) {
    console.log("Recommended events error");
    return res
      .status(503)
      .json({ message: "something went wrong with recommended api" });
  }
}
