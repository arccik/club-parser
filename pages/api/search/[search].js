import dbConnect from "../../../src/utils/dbConnect";
import Event from "../../../src/models/event-model";
import formatLocations from "../../../src/utils/formatLocations";
import Venue from "../../../src/models/venue-model";

export default async function handler(req, res) {
  await dbConnect();
  try {
    if (req.method === "GET") {
      const searchString = req.query.search;
      if (!searchString) return res.send("ok");

      // const eventResponse = await Event.find({
      //   $search: {
      //     index: "text",
      //     text: {
      //       query: searchString,
      //       path: {
      //         wildcard: "*",
      //       },
      //     },
      //   },
      // });
      // const venueResponse = await Venue.find({
      //   $search: {
      //     index: "text",
      //     text: {
      //       query: searchString,
      //       path: {
      //         wildcard: "*",
      //       },
      //     },
      //   },
      // });

      const eventResponse = await Event.find({
        $text: { $search: searchString },
      });
      const venueResponse = await Venue.find({
        $text: { $search: searchString },
      });

      let response = [...eventResponse, ...venueResponse];
      if (!response.length) {
        response.push({
          placeType: "none",
          id: "404",
          image: "/assets/logo.png",
          label: "Nothing was found",
          description: "Check you search query",
          value: "Not Found",
        });
      }

      return res.status(200).json(response);
    }
  } catch (error) {
    return res.status(503).json({ message: "Issue with server" });
  }

  return res.status(404).json({ message: "Wrong request method!" });
}
