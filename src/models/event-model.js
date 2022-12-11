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
    location: { type: { type: String }, coordinates: [Number] },
    formatted_address: { type: String },
    type: { type: String },
    phone: { type: String },
    rating: { type: Number, default: 0 },
    image: { type: String },
    distance: { type: Number },
    category: { type: String },
    open: { type: String },
    close: { type: String },
    venue: { type: Schema.Types.ObjectId, ref: "Venue" },
    startdate: { type: Date },
    enddate: { type: Date },
    minage: { type: Number },
    price: { type: String },
    description: { type: String },
    views: { type: String },
    placeType: { type: String, default: "event" },
  },
  { timestamps: true }
);

EventSchema.index({ location: "2dsphere" });

export default models.Event || model("Event", EventSchema);
