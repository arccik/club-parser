import Artist from "../../models/artist-model";

export default async function saveArtist(data) {
  const existInDB = await Artist.findOne({ artistid: data.artistid });
  if (existInDB) {
    return existInDB;
  } else {
    const savedArtist = await Artist.create(data);
    return savedArtist;
  }
}
