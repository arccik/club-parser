import Venue from "../../models/venue-model";

export default async function saveVenue(data) {
  try {
    const venue = await Venue.findOne({ venueId: data.id });
    if (!venue) {
      console.log("Venue data to save : ", data);
      const savedVenue = await Venue.create({
        venueId: data.id,
        location: {
          type: "Point",
          coordinates: [data.longitude, data.latitude],
        },
        ...data,
      });
      return savedVenue;
    }
    return venue;
  } catch (error) {
    console.log("Cannot save Venue to db");
    return null;
  }
}
