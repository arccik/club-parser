import React from "react";
import { Formik, Field, ErrorMessage } from "formik";
import formValidation from "./formValidation";
import { IconX } from "@tabler/icons";
import {
  Text,
  Title,
  Container,
  Button,
  Notification,
  MultiSelect,
  Loader,
  Select,
  Textarea,
} from "@mantine/core";
import useStyles from "./styles";
import initialValues from "./initialValues";
import { useAddNewEventMutation } from "../../../features/event/eventSlice";
import {
  useGetVenuesForEventsQuery,
  useGetFieldsNamesQuery,
} from "../../../features/admin/adminSlice";
import { useRouter } from "next/router";
import ErrorDispay from "../AddVenue/ErrorDispay";
import Loading from "../../../utils/Loading/Loading";
import { DatePicker } from "@mantine/dates";

const AddEvent = () => {
  const router = useRouter();
  const { data: fieldNames, isLoading } = useGetFieldsNamesQuery("events");
  const { data: venueData, isLoading: isVenueLoding } =
    useGetVenuesForEventsQuery();
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
          // remove empty fields
          const result = Object.entries(values).reduce(
            (a, [k, v]) => (v ? ((a[k] = v), a) : a),
            {}
          );
          const valuesToSend = { ...result, location };
          console.log("Value TO Send ADD EVENT ", valuesToSend);
          const response = await addEvent(valuesToSend).unwrap();
          console.log("Saved to DB ", response);
          if (response.status === "OK") setSubmitting(false);
          // router.push("/admin/events");
          console.log("Clicked", response);
        }}
      >
        {({
          handleSubmit,
          isSubmitting,
          errors,
          touched,
          setFieldValue,
          values,
        }) => (
          <form onSubmit={handleSubmit}>
            {fieldNames?.map((fieldName) => {
              if (fieldName === "genres") {
                return (
                  <MultiSelect
                    key={fieldName}
                    label="Genres"
                    onChange={(e) => setFieldValue("genres", e)}
                    placeholder="Yeah c'on Simon select Genres"
                    data={[
                      { value: "DNB", label: "DNB" },
                      { value: "Dubstep", label: "Dubstep" },
                      { value: "JumpUp", label: "JumpUp" },
                    ]}
                  />
                );
              }
              if (fieldName === "description")
                return (
                  <Textarea
                    key={fieldName}
                    placeholder={fieldName}
                    label={fieldName}
                    variant="default"
                    radius="md"
                    size="md"
                    minRows={4}
                    withAsterisk
                    autosize
                  />
                );
              if (fieldName === "venue") {
                if (isVenueLoding) return <Loader key={fieldName} />;
                return (
                  <Select
                    value={values.venue}
                    onChange={(e) => setFieldValue("venue", e)}
                    name={fieldName}
                    searchable
                    withAsterisk
                    key={fieldName}
                    data={venueData}
                    label="Venue"
                    nothingFound="Thie venue not present, please add on venue page"
                    placeholder="Pick venue where its taking place"
                  />
                );
              }
              if (fieldName === "startdate" || fieldName === "enddate") {
                return (
                  <DatePicker
                    key={fieldName}
                    name={fieldName}
                    onChange={(value) => setFieldValue(fieldName, value)}
                    placeholder={fieldName}
                    label={fieldName}
                  />
                );
              }
              return (
                <span key={fieldName}>
                  <Text className={classes.fieldLabel}>{fieldName}</Text>
                  <Field name={fieldName} className={classes.field} />
                  <ErrorMessage name={fieldName} component="div" />
                </span>
              );
            })}

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
