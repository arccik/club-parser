import saveEventToDB from "../../../../src/utils/parser/saveEventToDB";
import dbConnect from "../../../../src/utils/dbConnect";

export default async function handler(req, res) {
  await dbConnect();
  const pageNumber = req.query.page || 0;

  const urlGen = (page) => {
    return `https://www.skiddle.com/api/v1/events/search/?api_key=e196125bf92fd0b9fbeb7d7adf45017d&description=1&eventcode=CLUB&limit=100&offset=${page}00`;
  };

  const data = await fetch(urlGen(pageNumber || 8)).then((data) => data.json());

  const response = await Promise.all(
    data.results.map(async (value) => await saveEventToDB(value))
  );

  res
    .status(200)
    .json({ message: "Process Started, see logs for errors", response });
}
