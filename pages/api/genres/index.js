import Event from "../../../src/models/event-model";

export default async function handler(req, res) {
  try {
    const response = await Event.aggregate([
      { $unwind: "$genres" },
      { $group: { _id: null, genres: { $addToSet: "$genres" } } },
    ]);
    return res.status(200).json(response[0].genres);
  } catch (error) {
    console.log("error on the server with genres");
    return res
      .status(503)
      .json({ message: "Problem accure while getting genres" });
  }
}
