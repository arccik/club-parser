import React from "react";
import { Formik, Field, ErrorMessage } from "formik";
import formValidation from "./formValidation";
import { IconX } from "@tabler/icons";
import { Text, Title, Container, Button, Notification } from "@mantine/core";
import useStyles from "./styles";
import initialValues from "./initialValues";
import { useGetFieldsNamesQuery } from "../../../features/event/eventSlice";
import { useAddNewVenueMutation } from "../../../features/venue/venueSlice";
import { useRouter } from "next/router";
import ErrorDispay from "./ErrorDispay";

const AddVenue = () => {
  const router = useRouter();
  const { data: fieldNames, isLoading } = useGetFieldsNamesQuery("venues");
  const [addVenue] = useAddNewVenueMutation();
  const { classes } = useStyles();

  if (isLoading) return <p>Loading...</p>;

  return (
    <Container size="sm">
      <h2 className={classes.pageHeader}>Add Venue</h2>
      <Formik
        initialValues={initialValues(fieldNames)}
        validate={formValidation}
        onSubmit={async (values, { setSubmitting }) => {
          const location = {
            type: "Point",
            coordinates: values.location.trim().split(","),
          };
          const valuesToSend = { ...values, location };
          const response = await addVenue(valuesToSend).unwrap();
          if (response.status === "OK") setSubmitting(false);
          router.push("/admin/venues");
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

export default AddVenue;
