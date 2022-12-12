import TableScrollArea from "../../../src/components/AdminPage/TableScrollArea/TableScrollArea";

import { Container, ActionIcon } from "@mantine/core";
import { IconPlus } from "@tabler/icons";
import styles from "../../../src/styles/Home.module.css";
import Link from "next/link";
import Loading from "../../../src/utils/Loading/Loading";
import { useGetAdminVenuesQuery } from "../../../src/features/admin/adminSlice";

const AdminVenuesPage = () => {
  const { data, isLoading, error } = useGetAdminVenuesQuery();
  if (isLoading) return <Loading />;

  return (
    <Container size={"100%"} px={0}>
      <ActionIcon
        component={Link}
        title="Add new Event"
        href="/admin/venues/add"
        className={styles.floationAddItemButton}
      >
        <IconPlus />
      </ActionIcon>
      <TableScrollArea data={data} type="venues" />{" "}
    </Container>
  );
};

export default AdminVenuesPage;
