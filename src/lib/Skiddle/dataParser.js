import skiddleDataFormatter from "./formatData";
import URL from "./link";

export default async () => {
  try {
    const { results } = await fetch(URL).then((v) => v.json());
    const formattedData = skiddleDataFormatter(results);
    return formattedData;
  } catch (error) {
    res.json({ message: "Skiddle [data reading] ERROR:", error });
  }
};
