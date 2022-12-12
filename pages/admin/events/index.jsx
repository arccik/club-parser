import TableScrollArea from "../../../src/components/AdminPage/TableScrollArea/TableScrollArea";
import { useGetAdminEventsQuery } from "../../../src/features/admin/adminSlice";
import { Container, Button, Grid, ActionIcon } from "@mantine/core";
import { IconPlus } from "@tabler/icons";
import styles from "../../../src/styles/Home.module.css";
import Link from "next/link";
import Loading from "../../../src/utils/Loading/Loading";

const AdminEventsPage = () => {
  const { data, isLoading, error } = useGetAdminEventsQuery();
  if (isLoading) return <Loading />;

  return (
    <Container size={"100%"} px={0}>
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

export default AdminEventsPage;
