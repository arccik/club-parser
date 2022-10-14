const fs = require("fs");
const eventBriteDataFormatter = require("./formatData");

let URL =
  "https://www.eventbrite.com/api/v3/destination/events/?event_ids=274043921747,400487207017,395289319997,371192666257,395297524537,377763640217,418835667757,427554405737,417913459407,377759828817,398311158397,425195379827,417456532727,408253927487,425941010027,421812351097,409808527337,431703004307,431696635257,419193086807&expand=event_sales_status,image,primary_venue,saves,ticket_availability,primary_organizer,public_collections&page_size=100";

module.exports = async () => {
  const data = await fetch(URL).then((v) => v.json());

  const formattedData = eventBriteDataFormatter(data);

  const fileName = "JSONDATA/eventBriteData.json";
  const stringData = JSON.stringify(formattedData);
  fs.writeFile(fileName, stringData, (err) => console.log(err));
  return formattedData;
};
