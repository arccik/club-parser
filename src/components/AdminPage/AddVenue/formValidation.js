export default function validation(values) {
  const errors = {};

  if (!values.name) {
    errors.name = "Requerid";
  }
  if (!values.close) {
    errors.close = "Required";
  }

  return errors;
}
