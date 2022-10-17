import eventBriteDataFormatter from "./formatData";
import URL from "./link";

export default async () => {
  try {
    const data = await fetch(URL).then((v) => v.json());
    const formattedData = eventBriteDataFormatter(data);
    return formattedData;
  } catch (error) {
    res.json({ message: "Event Brite [data reading] ERROR:", error });
  }
};
