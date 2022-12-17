export default function initialValues(fields) {
  let initialValue = {};
  fields.forEach((field) => {
    if (field === "placeType") initialValue[field] = "events";
    else initialValue[field] = "";
  });
  return initialValue;
}
