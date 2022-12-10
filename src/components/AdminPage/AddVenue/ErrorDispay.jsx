import { ErrorMessage } from "formik";

const ErrorDispay = ({ errors }) => {
  const messages = Object.entries(errors).map(([field, message]) => {
    return (
      <ErrorMessage name={field} key={field}>
        {(msg) => <div>{`Field ${field.toUpperCase()} -  ${msg}`}</div>}
      </ErrorMessage>
    );
  });
  return messages;
};

export default ErrorDispay;
