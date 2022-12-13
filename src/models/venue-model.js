import { Schema, model, models } from "mongoose";

export const VenueSchema = new Schema(
  {
    venueId: { type: String },
    name: { type: String },
    link: { type: String },
    address: { type: String },
    town: { type: String },
    postcode: { type: String },
    country: { type: String },
    location: { type: { type: String, default: "Point" }, coordinates: [] },
    formatted_address: { type: String },
    type: { type: String },
    phone: { type: String },
    rating: { type: Number },
    image: { type: String },
    distance: { type: Number },
    genres: { type: String },
    views: { type: String, default: 0 },
    open: { type: String },
    close: { type: String },
    placeType: { type: String, default: "venue" },
    description: { type: String },
  },
  { timestamps: true }
);

VenueSchema.index({ location: "2dsphere" });

export default models.Venue || model("Venue", VenueSchema);
