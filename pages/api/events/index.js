import dbConnect from "../../../src/utils/dbConnect";
import Event from "../../../src/models/event-model";
export default async function handler(req, res) {
  try {
    await dbConnect();
    switch (req.method) {
      case "GET":
        const events = await Event.find({}).limit(40);
        return res.status(200).json(events);

      case "POST":
        const body = req.body;
        if (!body) {
          return res
            .status(200)
            .json({ message: "Please provide Event Details" });
        }
        const created = await Event.create(body, (error) => {
          if (error) return res.status(503).json({ message: "Corupted Data" });
        });
        return res
          .status(200)
          .json({ status: "OK", message: "Event Created", created });
      default:
        return res.status(404).json({ message: "Method not recognised" });
    }
  } catch (error) {
    return res
      .status(503)
      .json({ message: "Cannnot get Events API to work, Issue with server" });
  }

  return res.status(404).json({ message: "Wrong request method!" });
}




