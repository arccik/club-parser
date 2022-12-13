import TableScrollArea from "../../../src/components/AdminPage/TableScrollArea/TableScrollArea";
import { useGetVenuesQuery } from "../../../src/features/venue/venueSlice";

import { Container, ActionIcon } from "@mantine/core";
import { IconPlus } from "@tabler/icons";
import styles from "../../../src/styles/Home.module.css";

const EditEventPage = () => {
  const { data, isLoading, error } = useGetVenuesQuery();
  if (isLoading) return <p>Loading...</p>;

  return (
    <Container size={"100%"}>
      <ActionIcon className={styles.floationAddItemButton}>
        <IconPlus />
      </ActionIcon>
      <TableScrollArea data={data} link="venues" />{" "}
    </Container>
  );
};

export default EditEventPage;
