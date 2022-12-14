import React from "react";
import { Formik, Field, ErrorMessage } from "formik";
import formValidation from "./formValidation";
import { IconX } from "@tabler/icons";
import { Text, Title, Container, Button, Notification } from "@mantine/core";
import useStyles from "./styles";
import initialValues from "../AddVenue/initialValues";
import { useAddNewEventMutation } from "../../../features/event/eventSlice";
import { useGetFieldsNamesQuery } from "../../../features/admin/adminSlice";
// import { useAddNewEventMutation } from "../../../features/venue/venueSlice";
import { useRouter } from "next/router";
import ErrorDispay from "../AddVenue/ErrorDispay";
import Loading from "../../../utils/Loading/Loading";

const AddEvent = () => {
  const router = useRouter();
  const { data: fieldNames, isLoading } = useGetFieldsNamesQuery("events");
  const [addEvent] = useAddNewEventMutation();
  const { classes } = useStyles();
  if (isLoading) return <Loading />;

  return (
    <Container size="sm">
      <h2 className={classes.pageHeader}>Add Event</h2>
      <Formik
        initialValues={initialValues(fieldNames)}
        validate={formValidation}
        onSubmit={async (values, { setSubmitting }) => {
          const location = {
            type: "Point",
            coordinates: values.location.trim().split(","),
          };
          const result = Object.entries(values).reduce(
            (a, [k, v]) => (v ? ((a[k] = v), a) : a),
            {}
          );
          const valuesToSend = { ...result, location };

          const response = await addEvent(valuesToSend).unwrap();
          if (response.status === "OK") setSubmitting(false);
          // router.push("/admin/events");
          console.log("Clicked", response);
        }}
      >
        {({ handleSubmit, isSubmitting, errors, touched }) => (
          <form onSubmit={handleSubmit}>
            {fieldNames?.map((field) => (
              <span key={field}>
                <Text className={classes.fieldLabel}>{field}</Text>
                <Field name={field} className={classes.field} />
                <ErrorMessage name={field} component="div" />
              </span>
            ))}

            <Button
              variant="light"
              type="submit"
              fullWidth
              mt="lg"
              mb="lg"
              loading={isSubmitting}
            >
              Submit
            </Button>

            {Object.keys(errors).length && touched ? (
              <Notification
                m="lg"
                disallowClose
                icon={<IconX size={18} />}
                color="red"
              >
                <ErrorDispay errors={errors} />
              </Notification>
            ) : null}
          </form>
        )}
      </Formik>
    </Container>
  );
};

export default AddEvent;
