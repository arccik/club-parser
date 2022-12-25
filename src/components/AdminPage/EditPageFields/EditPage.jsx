import {
  Container,
  Grid,
  Title,
  TextInput,
  Button,
  Textarea,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import useStyles from "./styles";

import { useId } from "react";
import { useRouter } from "next/router";

const EditPage = ({ data, onSave, onDelete }) => {
  const { classes } = useStyles();
  const cacheID = useId();
  const router = useRouter();

  const handleDelete = () => {
    onDelete(data._id).then(() => router.push(`/admin/${data.placeType}s`));
  };

  const handleSave = (data) => {
    onSave(data);
  };

  if (!data) router.back();
  const fields =
    data &&
    Object.values(data).map((value, i) => {
      const label = Object.keys(data)[i];
      if (["__v", "_id", "eventId", "venueId", "location"].includes(label))
        return;
      else if (label === "description") {
        return (
          <Textarea
            key={cacheID + "description"}
            m="lg"
            value={data.description}
            placeholder={JSON.stringify(value)}
            label={label.toUpperCase()}
            autosize
          />
        );
      } else if (label === "startdate" || label === "enddate") {
        return (
          <DatePicker
            key={cacheID + label}
            placeholder={value}
            value={new Date(value)}
            label={label}
          />
        );
      } else {
        return (
          <TextInput
            key={value + i}
            m="lg"
            value={value || ""}
            onChange={console.log}
            placeholder={value}
            label={label.toUpperCase()}
          />
        );
      }
    });

  return (
    <Container size="sm">
      <div>
        <Title order={4} ta="center">
          {data?.name}
        </Title>

        {fields}

        <Grid mt="lg" mb="lg">
          <Grid.Col span={6}>
            <Button
              variant="light"
              fullWidth
              color="green"
              onClick={() => onSave(data._id)}
            >
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
      </div>
    </Container>
  );
};

export default EditPage;
