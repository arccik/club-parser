import React from "react";
import { Formik } from "formik";
import formValidation from "./formValidation";
import { IconX } from "@tabler/icons";
import {
  Container,
  Button,
  Notification,
  MultiSelect,
  Loader,
  Select,
  Textarea,
  TextInput,
} from "@mantine/core";
import useStyles from "./styles";
import initialValues from "./initialValues";
import {
  useAddNewEventMutation,
  useGetGenresQuery,
} from "../../../features/event/eventSlice";
import {
  useGetVenuesForEventsQuery,
  useGetFieldsNamesQuery,
} from "../../../features/admin/adminSlice";
import ErrorDispay from "../AddVenue/ErrorDispay";
import Loading from "../../../utils/Loading/Loading";
import { DatePicker } from "@mantine/dates";

const AddEvent = () => {
  const { data: fieldNames, isLoading: isFieldNamesLoading } =
    useGetFieldsNamesQuery("events");
  const { data: genresData, isLoading: isGenresLoading } = useGetGenresQuery();
  const { data: venueData, isLoading: isVenueLoding } =
    useGetVenuesForEventsQuery();
  const [addEvent] = useAddNewEventMutation();
  const { classes } = useStyles();
  if (isFieldNamesLoading || isGenresLoading || isVenueLoding)
    return <Loading />;

  return (
    <Container size="sm">
      <h2 className={classes.pageHeader}>Add Event</h2>
      <Formik
        initialValues={initialValues(fieldNames)}
        validate={formValidation}
        enableReinitialize
        onSubmit={async (values, { setSubmitting }) => {
          const location = {
            type: "Point",
            coordinates: values.location?.trim().split(","),
          };
          // remove empty fields
          const result = Object.entries(values).reduce(
            (a, [k, v]) => (v ? ((a[k] = v), a) : a),
            {}
          );
          const valuesToSend = { ...result, location };
          const response = await addEvent(valuesToSend).unwrap();
          if (response.status === "OK") setSubmitting(false);
          router.push("/admin/events");
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
            {fieldNames &&
              fieldNames?.map((fieldName) => {
                switch (fieldName) {
                  case "genres":
                    return (
                      <MultiSelect
                        key={fieldName}
                        label="Genres"
                        onChange={(e) => setFieldValue("genres", e)}
                        placeholder="Yeah c'on Simon select Genres"
                        data={genresData && genresData}
                      />
                    );
                  case "description":
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

                  case "venue":
                    return (
                      <Select
                        value={values.venue}
                        onChange={(e) => {
                          console.log("venue select: ", e);
                          setFieldValue("venue", e);
                        }}
                        name={fieldName}
                        searchable
                        withAsterisk
                        key={fieldName}
                        data={venueData && venueData}
                        label="Venue"
                        nothingFound="Thie venue not present, please add on venue page"
                        placeholder="Pick venue where its taking place"
                      />
                    );
                  case "startdate":
                    return (
                      <DatePicker
                        key={fieldName}
                        name={fieldName}
                        onChange={(value) => setFieldValue(fieldName, value)}
                        placeholder={fieldName}
                        label={fieldName}
                      />
                    );
                  case "enddate":
                    return (
                      <DatePicker
                        key={fieldName}
                        name={fieldName}
                        onChange={(value) => setFieldValue(fieldName, value)}
                        placeholder={fieldName}
                        label={fieldName}
                      />
                    );
                  default:
                    return (
                      <TextInput
                        name={fieldName}
                        placeholder={fieldName}
                        onChange={(value) =>
                          setFieldValue(fieldName, value?.target?.value)
                        }
                        value={values[fieldName]}
                        label={fieldName}
                        key={fieldName}
                      />
                    );
                }
              })}
            {console.log("Add Event Value s: ", values)}
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
