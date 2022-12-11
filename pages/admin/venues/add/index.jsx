import { Container, Button, Grid, ActionIcon } from "@mantine/core";
import { IconPlus } from "@tabler/icons";
import AddVenue from "../../../../src/components/AdminPage/AddVenue/AddVenue";

const AddVenuePage = () => {
  return (
    <Container size={"100%"}>
      <AddVenue />
    </Container>
  );
};

export default AddVenuePage;
