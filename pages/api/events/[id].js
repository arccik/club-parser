import connectMongo from "../../../utils/mongodbConnect";
import Event from "../../../models/event-model";
export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      await connectMongo();
      const { id } = req.query;
      //   check if valid objectID
      if (id.match(/^[0-9a-fA-F]{24}$/)) {
        const data = await Event.findById(id).populate("venue");
        return res.status(200).json(data);
      }
      return res.status(404).json({ message: "Nothing was found" });
    }
  } catch (error) {
    return res.status(503).json({ message: "Issue with server", error });
  }
  return res.status(404).json({ message: "Nothing found!" });
}
