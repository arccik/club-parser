module.exports = ({ events }) => {
  return events.map((value) => ({
    clubId: value.id,
    link: value.url,
    largeimageurl: value.image.original.url,
    startdate: value.start_date,
    date: value.start_date,
    eventname: value.name,
    description: value.summary,
    openingtimes: {
      doorsopen: value.start_time,
      doorsclose: value.end_time,
    },
    entryprice: value.ticket_availability.minimum_ticket_price.major_value,
    artists: [],
    venue: {
      type: value.primary_venue._type,
      name: value.primary_venue.name,
      town: value.primary_venue.address.address_2,
      address: value.primary_venue.address.address_1,
      postcode: value.primary_venue.address.postal_code,
      rating: "Not available",
      latitude: value.primary_venue.address.latitude,
      longitude: value.primary_venue.address.longitude,
    },
    minage: 18,
  }));
};
