import { Schema, model, models } from "mongoose";

const VenueSchema = new Schema(
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
    rating: { type: [Number] },
    ratedIPs: { type: [String] },
    image: { type: String },
    distance: { type: Number, default: null },
    genres: { type: [String] },
    views: { type: String, default: 0 },
    open: { type: String },
    close: { type: String },
    placeType: { type: String, default: "venue" },
    description: { type: String },
  },
  { timestamps: true }
);

// VenueSchema.index({ name: "text", description: "text", genres: "text" });
// VenueSchema.index({ location: "2dsphere" });

export default models.Venue || model("Venue", VenueSchema);
