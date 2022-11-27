import Event from "../models/event-model";

export default async function saveEventToDB(data) {
  try {
    const result = await Event.findOne({ eventId: data.id })
      .select("venueId")
      .lean();
    if (!result) {
      await Event.create({
        eventId: data.id,
        name: data.name,
        address: data.address,
        link: "stripradar.com",
        formatted_address: data.address,
        town: data.towm,
        postcode: data.postcode,
        country: data.country,
        location: {
          type: "Point",
          coordinates: [data.latitude, data.longitude],
        },
        type: data.type,
        phone: data.phone,
        rating: data.rating,
        image:
          "https://images.unsplash.com/photo-1578736641330-3155e606cd40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
        distance: 10,
        categories: data.type,
        views: 1,
        open: "22:00",
        close: "06:00",
      });
    }
  } catch (error) {
    console.log("Couldn't save Event to DB", error);
  }
}
