import { useAddNewEventMutation } from "../../../../src/features/event/eventSlice";
import { Container, Button, Grid, ActionIcon } from "@mantine/core";
import { IconPlus } from "@tabler/icons";
import AddEvent from "../../../../src/components/AdminPage/AddEvent/AddEvent";

const EditEventPage = () => {
  return (
    <Container size={"100%"}>
      <AddEvent />
    </Container>
  );
};

export default EditEventPage;
