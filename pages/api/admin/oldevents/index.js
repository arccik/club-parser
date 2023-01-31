import dbConnect from "../../../../src/utils/dbConnect";
import Event from "../../../../src/models/event-model";

export default async function handler(req, res) {
  try {
    await dbConnect();
    const { page } = req.query;
    const PAGE_LIMIT = 22;
    const startIndex = (Number(page) - 1) * PAGE_LIMIT;

    if (req.method === "GET") {
      const eventsTotal = await Event.countDocuments({
        startdate: { $lt: new Date() },
      });
      const events = await Event.find({ startdate: { $lt: new Date() } })

        .sort({ startdate: -1 })
        .skip(startIndex)
        .limit(PAGE_LIMIT);
      return res.status(200).json({
        events,
        currentPage: Number(page),
        numberOfPages: Math.ceil(eventsTotal / PAGE_LIMIT),
      });
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
