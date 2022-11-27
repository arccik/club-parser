import { Schema, model, models } from "mongoose";

const EventSchema = new Schema({
  eventId: { type: String },
  name: { type: String },
  link: { type: String },
  address: { type: String },
  town: { type: String },
  postcode: { type: String },
  country: { type: String },
  location: { type: { type: String }, coordinates: [Number] },
  formatted_address: { type: String },
  type: { type: String },
  phone: { type: String },
  rating: { type: Number },
  image: { type: String },
  distance: { type: Number },
  categories: { type: String },
  views: { type: String },
  open: { type: String },
  close: { type: String },
  venues: [{ type: String, ref: "venue" }],
});

EventSchema.index({ location: "2dsphere" });

export default models.Event || model("Event", EventSchema);
