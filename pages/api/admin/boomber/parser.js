import saveEventToDB from "../../../../src/utils/parser/saveEventToDB";
import dbConnect from "../../../../src/utils/dbConnect";

export default async function handler(req, res) {
  await dbConnect();
  const pageNumber = req.query.page || 0;
  const url_skiddle = `https://www.skiddle.com/api/v1/events/search?limit=100&offset=700&radius=30&date=2022-01-01T19%3A08%3A43&keyword=party&hidecancelled=1&order=trending&artistmeta=3&pub_key=42f25&platform=web&order=date`;

  const urlGen = (page) => {
    return `https://www.skiddle.com/api/v1/events/search/?api_key=e196125bf92fd0b9fbeb7d7adf45017d&description=1&eventcode=CLUB&limit=100&offset=${page}00`;
  };

  const data = await fetch(urlGen(pageNumber || 8)).then((data) => data.json());

  const response = await Promise.all(
    data.results.map(async (value) => await saveEventToDB(value))
  );
  // let result = [];
  // for (let i = 0; i < Math.ceil(data.totalcount / 100); i += 100) {
  //   const pageData = await fetch(urlGen(i)).then((res) => res.json());
  //   console.log("DATA BY PAGES: ", pageData.results.length, "Index : ", i);
  //   pageData.results.forEach(async (value) => {
  //     const res = await saveEventToDB(value);
  //     result.push(res);
  //   });
  // }

  res
    .status(200)
    .json({ message: "Process Started, see logs for errors", response });
}
