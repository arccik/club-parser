import Venue from "../../../../src/models/venue-model";

const url = "https://picsum.photos/1024/700?random=1";
export default async function handler(req, res) {
  const data = await fetch(url);

  // const randomImage = async () =>
  //   await fetch(url)
  //     .then(({ data }) => data)
  //     .then((result) => {
  //       return result.url;
  //     });

  const generateLinks = (name) => {
    return `https://www.google.com/search?q=${name.split(" ").join("+")}`;
  };

  const venues = await Venue.find();
  venues.forEach(async (venue) => {
    venue.link = generateLinks(venue.name);
    await venue.save();
  });

  // await Venue.updateMany({}, { image: randomImage()?.url?.regular });
  res.status(200).json({ message: "Successfully Update images" });
}
