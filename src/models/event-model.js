import { Schema, model, models } from "mongoose";

const EventSchema = new Schema(
  {
    eventId: { type: String },
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
    distance: { type: Number, default: null },
    genres: { type: String },
    views: { type: String, default: 0 },
    open: { type: String },
    close: { type: String },
    placeType: { type: String, default: "event" },
    description: { type: String },
    venue: { type: Schema.Types.ObjectId, ref: "Venue" },
    genres: { type: [String] },
    startdate: { type: Date },
    enddate: { type: Date },
    minage: { type: Number },
    price: { type: String },
  },
  { timestamps: true }
);


EventSchema.index({ name: "text", description: "text", genres: "text" });

EventSchema.index({ location: "2dsphere" });

export default models.Event || model("Event", EventSchema);



