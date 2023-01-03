import { Schema, model, models } from "mongoose";

const ArtistSchema = new Schema({
  artistid: String,
  name: String,
  image: String,
  spotifymp3url: String,
});

export default models.Artist || model("Artist", ArtistSchema);
