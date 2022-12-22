import {
  Container,
  Grid,
  Title,
  Button,
  Textarea,
  Notification,
  MultiSelect,
  Text,
  TextInput,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useRouter } from "next/router";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { IconX } from "@tabler/icons";
import * as Yup from "yup";
import useStyles from "./styles";
import { useGetFieldsNamesQuery } from "../../../features/admin/adminSlice";
import genres from "../../../utils/musicGenres";
import UploadFile from "./UploadFile/UploadFile";

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(70, "Too Long!")
    .required("Required"),
});

const Edit = ({ data, onSave, onDelete }) => {
  const { classes } = useStyles();
  const router = useRouter();

  const { data: fieldsName, isLoading } = useGetFieldsNamesQuery(
    data.placeType
  );
  const handleDelete = () => {
    onDelete(data._id).then(() => router.push(`/admin/${data.placeType}s`));
  };

  const handleSubmit = async (data) => {
    const { data: response, errors } = await onSave(data);
    if (errors) return <p>Cannot update Item</p>;
    if (response.status === "OK") return router.back();
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
        {({ errors, touched, values, setFieldValue }) => (
          <Form style={{ margin: 20 }}>
            {fieldsName?.map((field) => {
              if (field === "image")
                return (
                  <UploadFile
                    key={field}
                    fileUrl={data.image}
                    setValue={setFieldValue}
                  />
                );
              if (field === "genres")
                return (
                  <MultiSelect
                    key={field}
                    size="md"
                    label="Genres"
                    onChange={(e) => setFieldValue("genres", e)}
                    placeholder="Yeah c'on Simon select Genres"
                    searchable
                    value={values[field]}
                    data={genres}
                  />
                );
              if (field === "startdate" || field === "enddate")
                return (
                  <DatePicker
                    size="lg"
                    defaultValue={new Date(values[field])}
                    key={field}
                    label={field}
                    placeholder={values[field]}
                    name={field}
                    // value={values[field]}
                    onChange={(e) => setFieldValue(field, e)}
                  />
                );
              if (field === "description")
                return (
                  <Textarea
                    radius="md"
                    size="md"
                    name="description"
                    key={field}
                    label={field}
                    placeholder="C'om Simon Write something"
                    autosize
                    value={values[field]}
                    onChange={(e) => setFieldValue(field, e.target.value)}
                    minRows={2}
                  />
                );
              return (
                <span key={field}>
                  <Text mt="lg">{field.toUpperCase()}</Text>
                  <Field name={field} className={classes.input} />
                  <ErrorMessage name={field} />
                </span>
              );
            })}

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
