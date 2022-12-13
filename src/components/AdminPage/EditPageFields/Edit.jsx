import {
  Container,
  Grid,
  Title,
  TextInput,
  Button,
  Textarea,
  Notification,
  Text,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useRouter } from "next/router";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { IconX } from "@tabler/icons";
import * as Yup from "yup";
import useStyles from "./styles";
import { useGetFieldsNamesQuery } from "../../../features/admin/adminSlice";

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(70, "Too Long!")
    .required("Required"),
});

const Edit = ({ data, onSave, onDelete }) => {
  const { classes } = useStyles();
  const router = useRouter();

  const { data: fieldsName, isLoading } = useGetFieldsNamesQuery("venues");
  const handleDelete = () => {
    onDelete(data._id).then(() => router.push(`/admin/${data.placeType}s`));
  };

  const fields = fieldsName?.map((field) => {
    if (
      ["__v", "_id", "id", "views", "category", "eventId", "location"].includes(
        field
      )
    ) {
      return;
    }
    return (
      <span key={field}>
        <Text mt="lg">{field.toUpperCase()}</Text>
        <Field name={field} className={classes.input} />
        <ErrorMessage name={field} />
      </span>
    );
  });

  const handleSubmit = async (data) => {
    const { data: response, errors } = await onSave(data);
    if (errors) return <p>Cannot update Item</p>;
    if (response.status === "OK") return router.back();
    console.log("Handle Submit: File Saved: ", response);
  };

  if (!data) router.back();

  return (
    <Container size="sm">
      <Title order={4} ta="center">
        {data?.name}
      </Title>

      <Formik
        initialValues={data}
        validationSchema={SignupSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            {fields}

            {!!Object.values(errors).length && (
              <Notification color="red">
                {console.log(errors)}
                <Text>Name</Text>
                <ErrorMessage name="name" />
              </Notification>
            )}
            <Grid mt="lg" mb="lg">
              <Grid.Col span={6}>
                <Button variant="light" fullWidth color="green" type="submit">
                  Save
                </Button>
              </Grid.Col>
              <Grid.Col span={6}>
                <Button
                  variant="light"
                  fullWidth
                  color="red"
                  onClick={handleDelete}
                >
                  Delete
                </Button>
              </Grid.Col>
            </Grid>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default Edit;
