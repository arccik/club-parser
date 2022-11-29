import Venue from "../../../models/venue-model";

const url = "https://picsum.photos/1024/700?random=1";
export default async function handler(req, res) {
  const randomImage = async () =>
    await fetch(url)
      .then((response) => response)
      .then((result) => {
        return result.url;
      });

  const venues = await Venue.find();
  venues.forEach(async (venue) => {
    venue.image = await randomImage();
    await venue.save();
  });

  // await Venue.updateMany({}, { image: randomImage()?.url?.regular });
  res.status(200).json({ message: "Successfully Update images" });
}
