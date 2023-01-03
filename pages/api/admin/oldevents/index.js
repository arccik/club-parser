import dbConnect from "../../../../src/utils/dbConnect";
import Event from "../../../../src/models/event-model";

export default async function handler(req, res) {
  try {
    await dbConnect();
    if (req.method === "GET") {
      const events = await Event.find({ startdate: { $lte: new Date() } });
      return res.status(200).json(events);
    } else {
      return res.status(404).json({
        message: "Method not accepted",
      });
    }
  } catch (error) {
    return res
      .status(503)
      .json({ message: "Cannnot get Event API to work, Issue with server" });
  }
}
