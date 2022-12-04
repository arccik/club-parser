import Event from "../src/models/event-model";
import Venue from "../src/models/venue-model";

export default async function saveEventToDB(data) {
  try {
    const result = await Event.findOne({ eventId: data?.id })
      .select("eventId")
      .lean();
    if (!result) {
      const venue = await Venue.find({ venueID: data.venueId });
      await Event.create({
        eventId: data?.id,
        name: data?.eventname,
        description: data?.description,
        address: data?.venue.address,
        link: data?.link,
        formatted_address: data?.venue.address,
        town: data?.venue.towm,
        postcode: data?.venue.postcode,
        country: data?.venue.country,
        location: {
          type: "Point",
          coordinates: [data?.venue.latitude, data?.venue.longitude],
        },
        type: "Event",
        phone: data?.venue.phone,
        rating: data?.venue.rating,
        image: data?.xlargeimageurl,
        distance: 10,
        category: data?.type,
        views: 1,
        startdate: data?.startdate,
        enddate: data?.enddate,
        open: data?.openingtimes.doorsopen,
        close: data?.openingtimes.doorsclose,
        minage: data?.minage,
        price: data?.entryprice,
        venue: venue[0],
      });
    }
  } catch (error) {
    console.log("Couldn't save Event to DB", error);
  }
}
