import TableScrollArea from "../../../src/components/AdminPage/TableScrollArea/TableScrollArea";
import { useGetAdminEventsQuery } from "../../../src/features/admin/adminSlice";
import { Container, Button, Grid, ActionIcon, TextInput } from "@mantine/core";
import { IconPlus } from "@tabler/icons";
import styles from "../../../src/styles/Home.module.css";
import Link from "next/link";
import Loading from "../../../src/utils/Loading/Loading";
import { useState } from "react";

const AdminEventsPage = () => {
  const { data, isLoading, error } = useGetAdminEventsQuery();

  const [filteredData, setFilteredData] = useState(null);
  const handleSearch = ({ target }) => {
    if (target.value === "") setFilteredData(null);
    setFilteredData(
      data.filter((value) =>
        value.name.toLowerCase().includes(target.value.toLowerCase())
      )
    );
  };
  if (isLoading) return <Loading />;
  return (
    <Container size={"100%"} px={0}>
      <TextInput
        onChange={handleSearch}
        size="sm"
        placeholder="What's looking for ?"
      />
      <ActionIcon
        component={Link}
        title="Add new Event"
        href="/admin/events/add"
        className={styles.floationAddItemButton}
      >
        <IconPlus />
      </ActionIcon>
      <TableScrollArea data={filteredData || data} />
    </Container>
  );
};

export default AdminEventsPage;
