import type { NextApiRequest, NextApiResponse } from "next";
import Club from "../../../src/services/models/Club";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse // <Data>
) {
  try {
    const id = req.query.id;
    console.log("ID ", id);
    if (id) {
      const club = await Club.findById(id);
      console.log({ club });
      if (!club) return res.status(401).json({ message: "Club not found" });
      return res.status(200).json(club);
    } else {
      return res.json({ message: "ID Not found" });
    }
  } catch (error) {
    return res.status(401).json({ message: "READING DATA:", error });
  }
}
