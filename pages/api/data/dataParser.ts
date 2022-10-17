import type { NextApiRequest, NextApiResponse } from "next";
import eventBirteDataParser from "../../../src/lib/EventBirte/dataParser";
import skiddleDataParser from "../../../src/lib/Skiddle/dataParser";
import saveToDB from "../../../src/services/db/saveToDB";

import "../../../src/services/db/dbconnection";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const eventBriteData = await eventBirteDataParser();
    const skiddleData = await skiddleDataParser();
    const data = [...eventBriteData, ...skiddleData];
    saveToDB(data);
    return res.json({ message: "Data Downloading..." });
  } catch (error) {
    return res.status(404).json({ message: "Cannot get data", error });
  }
}
