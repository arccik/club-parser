// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
// import IEvent from '../../../interfaces/event';
import eventBirteDataParser from "../../../lib/EventBirte/eventBriteDataParser";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const resolved = await eventBirteDataParser();
    return res.json({ message: "Data Downloading...", resolved });
  } catch (error) {
    return res.status(404).json({ message: "Cannot get data", error });
  }
}
