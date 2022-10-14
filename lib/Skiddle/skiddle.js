const fs = require("fs");
const eventBriteDataFormatter = require("./eventBriteDataFormatter");
const URL = require("./link");

let _url =
  "https://www.skiddle.com/api/v1/events/search?limit=100&offset=100&radius=30&date=2022-10-12T19%3A08%3A43&keyword=party&hidecancelled=1";

module.exports = async () => {
  const data = await fetch(URL).then((v) => v.json());

  const formattedData = eventBriteDataFormatter(data);

  const fileName = "JSONDATA/eventBriteData.json";
  const stringData = JSON.stringify(formattedData);
  fs.writeFile(fileName, stringData, (err) => console.log(err));
  return formattedData;
};
