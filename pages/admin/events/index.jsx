import TableScrollArea from "../../../src/components/AdminPage/TableScrollArea/TableScrollArea";
import { useGetEventsQuery } from "../../../src/features/event/eventSlice";
import { Container, Button, Grid, ActionIcon } from "@mantine/core";
import { IconPlus } from "@tabler/icons";
import styles from "../../../src/styles/Home.module.css";
import Link from "next/link";
import Loading from "../../../src/utils/Loading/Loading";

const AddEventPage = () => {
  const { data, isLoading, error } = useGetEventsQuery();
  if (isLoading) return <Loading />;

  return (
    <Container size={"100%"}>
      <ActionIcon
        component={Link}
        title="Add new Event"
        href="/admin/events/add"
        className={styles.floationAddItemButton}
      >
        <IconPlus />
      </ActionIcon>
      <TableScrollArea data={data} />
    </Container>
  );
};

export default AddEventPage;
