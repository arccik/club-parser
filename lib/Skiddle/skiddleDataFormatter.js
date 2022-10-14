export default function (data) {
  return data.map((value) => ({
    id: value.id,
    link: value.link,
    largeimageurl: value.imageurl,
    startdate: value.startdate,
    date: value.date,
    eventname: value.eventname,
    description: value.description,
    openingtimes: {
      doorsopen: value.openingtimes.doorsopen,
      doorsclose: value.openingtimes.doorsclose,
    },
    entryprice: value.entryprice,
    artists: value.artists && [...value.artists],
    venue: {
      type: value.venue.type,
      name: value.venue.name,
      town: value.venue.town,
      address: value.venue.address,
      postcode: value.venue.postcode,
      rating: value.venue.rating,
      latitude: value.venue.latitude,
      longitude: value.venue.longitude,
    },
    minage: value.minage,
  }));
}
