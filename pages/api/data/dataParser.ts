// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
// import IEvent from '../../../interfaces/event';
import skiddleDataParser from "../../../lib/Skiddle/skiddleDataParser";
import eventBirteDataParser from "../../../lib/EventBirte/eventBriteDataParser";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const resolved = await eventBirteDataParser();
    const resolved2 = await skiddleDataParser();
    return res.json({ message: "Data Downloading...", resolved, resolved2 });
  } catch (error) {
    return res.status(404).json({ message: "Cannot get data", error });
  }
}
