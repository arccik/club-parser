import { Container, Grid, Title, TextInput, Button } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import useStyles from "./styles";
import {
  useGetPostByIdQuery,
  useGetPostsQuery,
} from "../../../../src/features/event/eventSlice";
import { useRouter } from "next/router";

const EditEvent = () => {
  const { classes } = useStyles();
  const router = useRouter();
  const { id } = router.query;
  // if (!id) return <p>Post Not Found!</p>;

  const {
    data: eventData,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPostByIdQuery(id);
  console.log({ eventData });
  if (isError) return <p>Error check console : {console.log({ error })}</p>;
  if (isLoading) return <p>Loading...</p>;
  return (
    <Container size="sm">
      <Title order={4} ta="center">
        {eventData?.name}
      </Title>
      <div>
        <TextInput
          mt="md"
          label="Name"
          placeholder={eventData?.name}
          defaultValue={eventData?.name}
          classNames={classes}
        />
        <TextInput
          mt="md"
          label="Description"
          placeholder={eventData?.description}
          defaultValue={eventData?.description}
          classNames={classes}
        />
        <DatePicker
          style={{ marginTop: 20 }}
          label="Event Date"
          placeholder={eventData?.startdate}
          value={eventData?.startdate}
          classNames={classes}
          clearable={false}
        />
        <TextInput
          mt="md"
          label="Open"
          placeholder={eventData?.open}
          classNames={classes}
        />
        <TextInput
          mt="md"
          label="Close"
          placeholder={eventData?.close}
          classNames={classes}
        />
        <TextInput
          mt="md"
          label="Image URL"
          placeholder={eventData?.image}
          classNames={classes}
        />
        <TextInput
          mt="md"
          label="Tickt link"
          placeholder={eventData?.link}
          classNames={classes}
        />

        <Grid mt="lg">
          <Grid.Col span={6}>
            <Button variant="light" fullWidth color="green">
              Save
            </Button>
          </Grid.Col>
          <Grid.Col span={6}>
            <Button variant="light" fullWidth color="red">
              Reset
            </Button>
          </Grid.Col>
        </Grid>
      </div>
    </Container>
  );
};

export default EditEvent;
