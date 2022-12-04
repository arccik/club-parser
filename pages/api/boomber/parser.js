import saveEventToDB from "../../../src/utils/saveEventToDB";

export default async function handler(req, res) {
  const url_skiddle =
    "https://www.skiddle.com/api/v1/events/search?limit=100&offset=200&radius=30&date=2021-10-12T19%3A08%3A43&keyword=party&hidecancelled=1&order=trending&artistmeta=3&pub_key=42f25&platform=web&order=date";

  const data = await fetch(url_skiddle).then((data) => data.json());

  data.results.forEach(async (value) => {
    await saveEventToDB(value);
  });
  res.status(200).json(data);
}
