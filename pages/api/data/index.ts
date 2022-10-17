import type { NextApiRequest, NextApiResponse } from "next";
import formatDistance from "date-fns/formatDistance";

import Club from "../../../src/services/models/Club";
import "../../../src/services/db/dbconnection";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const limit = Number(req.query?.limit);
    const offset = Number(req.query?.offset);
    if (typeof limit === "number" && limit <= 100) {
      const data = await Club.find({ date: { $gt: Date() } })
        .sort("date")
        .skip(offset)
        .limit(limit);
      if (!data) return res.json({ message: "Data wasn't found" });
      return res.status(200).json(data);
    }

    const data = await Club.find({ date: { $gt: Date() } }).sort("date");
    return res.json(data);
  } catch (error) {
    res.status(401).json({ message: "ERROR READING DATA:", error });
  }
}
