import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import IEvent from "../../../interfaces/event";

import data from "../../../JSONDATA/mockData.json";
import data2 from "../../../JSONDATA/eventBriteData.json";
import IClub from "../../../interfaces/club";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse // <Data>
) {
  try {
    const id = req.query.id;
    if (id) {
      const json = [...data, ...data2];
      const response: any = json.filter((value: any) => value.id === id);

      return res.status(200).json(response);
    } else {
      res.json({ message: "ID Not found" });
    }
  } catch (error) {
    res.status(401).json({ message: "READING DATA:", error });
  }
}
