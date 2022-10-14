import { Schema, model } from "mongoose";

const ClubPost = new Schema({
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
  artists: {},
  venue: {
    type: String,
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
