import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";

import compareAsc from "date-fns/compareAsc";
import formatDistance from "date-fns/formatDistance";
import IEvent from "../../../interfaces/event";
import eventBriteData from "../../../JSONDATA/eventBriteData.json";
import skiddleData from "../../../JSONDATA/mockData.json";

// type Data = {
//   name: string;
// };
const URL = "../../../JSONDATA/eventBirteData.json";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse // <Data>
) {
  try {
    fs.readFile(URL, "utf8", (err, data) => {
      if (err) throw new Error("READING: Something went wrong!");

      const json = JSON.parse(data).sort(
        (a: IEvent, b: IEvent): Date | number =>
          compareAsc(new Date(a.startdate), new Date(b.startdate))
      );
      json.forEach((club: IEvent, i: number) => {
        club.date = formatDistance(new Date(club.date), new Date(), {
          addSuffix: true,
        });
      });

      return res.status(200).json(json);
    });
  } catch (error) {
    res.status(401).json({ message: "READING DATA:", error });
  }
}
