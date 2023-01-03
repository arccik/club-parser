import Event from "../../models/event-model";
import saveVenue from "./saveVenue";
import getArtistsIDs from "./getArtistsIDs";

export default async function saveEventToDB(data) {
  try {
    const event = await Event.findOne({ eventId: data?.id }).select("eventId");
    console.log("DOes event Exist ? ", event);
    if (!event) {
      console.log("Event not in DB, creating new one");

      // const promisAll = await Promise.all([
      //   saveVenue(data.venue),
      //   getArtistsIDs(data.artists),
      // ]);
      let savedVenue = await saveVenue(data.venue);

      const genres =
        data.genres.length > 0 && data.genres.map((genre) => genre.name);
      const artistIDs = await getArtistsIDs(data.artists);
      return await Event.create({
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
          coordinates: [data?.venue.longitude, data?.venue.latitude],
        },
        type: "Event",
        phone: data?.venue.phone,
        rating: data?.venue.rating,
        image: data?.xlargeimageurl,
        distance: null,
        category: data?.type,
        views: 1,
        startdate: data?.startdate,
        enddate: data?.enddate,
        open: data?.openingtimes.doorsopen,
        close: data?.openingtimes.doorsclose,
        minage: data?.minage || 18,
        price: data?.entryprice,
        venue: savedVenue,
        genres: genres,
        artists: artistIDs,
      });
    }
  } catch (error) {
    console.log("Couldn't save Event to DB", error);
  }
}
