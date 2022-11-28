import Venue from "../../../models/venue-model";

const URL =
  "https://images.unsplash.com/photo-1416339306562-f3d12fefd36f?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&s=92f3e02f63678acc8416d044e189f515";

export default async function handler(req, res) {
  const randomImage = async () => await fetch(URL).then((res) => res.json());
  const response = await Venue.updateMany({}, { image: "http://random.image" });
}
