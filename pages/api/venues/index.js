import dbConnect from "../../../src/utils/dbConnect";
import Venue from "../../../src/models/venue-model";
export default async function handler(req, res) {
  try {
    await dbConnect();
    switch (req.method) {
      case "GET":
        const venues = await Venue.find({}).limit(40);
        return res.status(200).json(venues);
      case "POST":
        const body = req.body;
        console.log("POST VENUE> >>> ", body);
        if (!body) {
          return res
            .status(200)
            .json({ message: "Please provide Venue Details" });
        }
        const created = await Venue.create(body, (error) => {
          if (error) return res.status(503).json({ message: "Corupted Data" });
        });
        return res
          .status(200)
          .json({ status: "OK", message: "Venue Created", created });
      default:
        return res.status(404).json({ message: "Method not recognised" });
    }
  } catch (error) {
    return res
      .status(503)
      .json({ message: "Cannnot get Venue API to work, Issue with server" });
  }

  return res.status(404).json({ message: "Wrong request method!" });
}




