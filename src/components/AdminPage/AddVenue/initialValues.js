const initialValues = (fields) => {
  let initialValue = {};
  fields.forEach((field) => {
    initialValue[field] = "";
  });
  return initialValue;
};
export default initialValues;
