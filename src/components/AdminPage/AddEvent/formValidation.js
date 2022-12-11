export default function validation(values) {
  const errors = {};

  if (!values.name) {
    errors.name = "Requerid";
  }
  if (!values.close) {
    errors.startdate = "Required";
  }

  return errors;
}
