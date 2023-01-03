import saveArtist from "./saveArtists";

export default async function getArtistsIDs(artists) {
  let result = [];
  if (artists.length > 0) {
    for (let i = 0; i < artists.length; i++) {
      const artist = artists[i];
      const saved = await saveArtist(artist);
      result.push(saved);
    }
    return result;
    // return Promise.all(
    //   artists.map(async (artist) => {
    //     return await saveArtist(artist);
    //   })
    // );
  } else {
    return null;
  }
}
