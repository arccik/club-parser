import TableScrollArea from "../../../src/components/AdminPage/TableScrollArea/TableScrollArea";
import { useGetVenuesQuery } from "../../../src/features/venue/venueSlice";

import { Container, ActionIcon } from "@mantine/core";
import { IconPlus } from "@tabler/icons";
import styles from "../../../src/styles/Home.module.css";
import Link from "next/link";
import Loading from "../../../src/utils/Loading/Loading";

const EditEventPage = () => {
  const { data, isLoading, error } = useGetVenuesQuery();
  if (isLoading) return <Loading />;

  return (
    <Container size={"100%"}>
      <ActionIcon
        component={Link}
        title="Add new Event"
        href="/admin/venues/add"
        className={styles.floationAddItemButton}
      >
        <IconPlus />
      </ActionIcon>
      <TableScrollArea data={data} link="venues" />{" "}
    </Container>
  );
};

export default EditEventPage;
