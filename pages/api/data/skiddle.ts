import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import formatAndSort from "../../../lib/formatAndSort";
import skiddleDataFormatter from "../../../lib/Skiddle/formatData";
import URL from "../../../lib/Skiddle/link";

const fileName = "../../JSONDATA/skiddle.json";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse // <Data>
) {
  try {
    const { results } = await fetch(URL).then((v) => v.json());
    const formattedData = skiddleDataFormatter(results);

    // const sortedData = formatAndSort(formattedData);
    const stringData = JSON.stringify(formattedData);

    fs.writeFile("JSONDATA/skiddle.json", stringData, (err) =>
      console.log(err)
    );
    return res.status(200).json(formattedData);
  } catch (error) {
    res.status(401).json({ message: "READING DATA:", error });
  }
}
