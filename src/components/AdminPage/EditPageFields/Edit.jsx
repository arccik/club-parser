import {
  Container,
  Grid,
  Title,
  Button,
  Textarea,
  Notification,
  MultiSelect,
  Text,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useRouter } from "next/router";
import { Formik, Form, ErrorMessage } from "formik";
import { useGetFieldsNamesQuery } from "../../../features/admin/adminSlice";
// import genres from "../../../utils/musicGenres";
import UploadFile from "./UploadFile/UploadFile";
import Loading from "../../../utils/Loading/Loading";
import { useGetGenresQuery } from "../../../features/event/eventSlice";

const Edit = ({ data, onSave, onDelete }) => {
  const { data: genres, isLoading: isGenresLoading } = useGetGenresQuery();
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
  if (isLoading || isGenresLoading) return <Loading />;
  if (!data) router.back();
  return (
    <Container size="sm">
      <Title order={4} ta="center">
        {data?.name}
      </Title>

      <Formik initialValues={data} onSubmit={handleSubmit}>
        {({ errors, values, setFieldValue }) => (
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
                    autosize
                    value={values[field]}
                    onChange={(e) => setFieldValue(field, e.target.value)}
                    minRows={2}
                  />
                );

              return (
                <Textarea
                  radius="md"
                  size="md"
                  name={field}
                  key={field}
                  label={field[0].toUpperCase() + field.slice(1)}
                  autosize
                  value={values[field]}
                  onChange={(e) => setFieldValue(field, e.target.value)}
                />
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
