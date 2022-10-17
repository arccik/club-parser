const mongoose = require("mongoose");

const ClubSchema = new mongoose.Schema({
  clubId: String,
  link: String,
  largeimageurl: String,
  startdate: Date,
  date: Date,
  eventname: String,
  description: String,
  openingtimes: {
    doorsopen: String,
    doorsclose: String,
  },
  entryprice: String,
  artists: {
    artistid: String,
    name: String,
    image: String,
    spotifymp3url: String,
    spotifyartisturl: String,
  },
  venue: {
    type: { type: String },
    name: String,
    town: String,
    address: String,
    postcode: String,
    rating: String,
    latitude: String,
    longitude: String,
  },
  minage: String,
});

module.exports = mongoose.models.Club || mongoose.model("Club", ClubSchema);
