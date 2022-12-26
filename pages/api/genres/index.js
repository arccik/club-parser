import dbConnect from "../../../src/utils/dbConnect";
import Event from "../../../src/models/event-model";
import Venue from "../../../src/models/venue-model";

export default async function handler(req, res) {
  try {
    await dbConnect();
    return res.status(200).json({ events: 1 });
  } catch (error) {
    console.log("Could not get genres", error);
    return res.status(404).json({ message: "Could not get genres", error });
  }
}
