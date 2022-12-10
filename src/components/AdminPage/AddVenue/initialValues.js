export default function initialValues(fields) {
  let initialValue = {};
  fields.forEach((field) => {
    initialValue[field] = "";
  });
  return initialValue;
}
