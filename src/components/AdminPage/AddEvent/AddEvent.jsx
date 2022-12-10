import {
  Container,
  Grid,
  Title,
  TextInput,
  Button,
  Textarea,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";

import { useRouter } from "next/router";

//   "link",
//   "address",
//   "town",
//   "postcode",
//   "country",
//   "location",
//   "phone",
//   "imageUrl",
//   "close",
//   "open",
//   "startdate",
//   "enddate",
//   "minage",
//   "price",
//   "description",

const AddEvent = () => {
  return (
    <Container size="sm">
      <div>
        <Title order={4} ta="center">
          Add New Event
        </Title>

        <TextInput
          m="lg"
          onChange={console.log}
          label="Name"
          placeholder="Write Something"
        />
        <Textarea
          m="lg"
          placeholder="Write Something"
          label="Description"
          autosize
        />
        <DatePicker
          m="lg"
          placeholder={"Select Date"}
          value={new Date()}
          label={"Pick Date"}
        />
        <TextInput
          m="lg"
          onChange={console.log}
          label="Link to website"
          placeholder="Write Something"
        />

        <Grid mt="lg" mb="lg">
          <Grid.Col span={6}>
            <Button variant="light" fullWidth color="green">
              Save
            </Button>
          </Grid.Col>
          <Grid.Col span={6}>
            <Button variant="light" fullWidth color="red">
              Delete
            </Button>
          </Grid.Col>
        </Grid>
      </div>
    </Container>
  );
};

export default AddEvent;
