import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";

import compareAsc from "date-fns/compareAsc";
import formatDistance from "date-fns/formatDistance";
import IEvent from "../../../interfaces/event";
import eventBriteData from "../../../JSONDATA/eventBriteData.json";
import skiddleData from "../../../JSONDATA/skiddle.json";

// type Data = {
//   name: string;
// };
const URL = "../../../JSONDATA/eventBirteData.json";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse // <Data>
) {
  try {
    res.status(200).json([...eventBriteData, ...skiddleData]);
  } catch (error) {
    res.status(401).json({ message: "READING DATA:", error });
  }
}
