import type { NextApiRequest, NextApiResponse } from "next";

import Club from "../../../src/services/models/Club";
import "../../../src/services/db/dbconnection";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const limit = Number(req.query?.limit);
    const offset = Number(req.query?.offset);
    if (typeof limit === "number") {
      const data = await Club.find({ date: { $gt: Date() } })
        .sort("date")
        .skip(offset)
        .limit(limit);
      if (!data) return res.json({ message: "Data wasn't found" });

      const response = {
        total: await Club.countDocuments({ date: { $gt: Date() } }),
        limit: limit,
        offset: offset,
        data,
      };
      return res.status(200).json(response);
    }

    const data = await Club.find({ date: { $gt: Date() } }).sort("date");
    return res.json(data);
  } catch (error) {
    res.status(401).json({ message: "ERROR READING DATA:", error });
  }
}
