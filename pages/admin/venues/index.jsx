import TableScrollArea from "../../../src/components/AdminPage/TableScrollArea/TableScrollArea";
import { useState } from "react";
import { Container, ActionIcon, TextInput } from "@mantine/core";
import { IconPlus } from "@tabler/icons";
import styles from "../../../src/styles/Home.module.css";
import Link from "next/link";
import Loading from "../../../src/utils/Loading/Loading";
import { useGetAdminVenuesQuery } from "../../../src/features/admin/adminSlice";

const AdminVenuesPage = () => {
  const [filteredData, setFilteredData] = useState(null);
  const handleSearch = ({ target }) => {
    if (target.value === "") setFilteredData(null);
    setFilteredData(
      data.filter((value) =>
        value.name.toLowerCase().includes(target.value.toLowerCase())
      )
    );
  };
  const { data, isLoading, error } = useGetAdminVenuesQuery();
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
        href="/admin/venues/add"
        className={styles.floationAddItemButton}
      >
        <IconPlus />
      </ActionIcon>
      <TableScrollArea data={filteredData || data} type="venues" />
    </Container>
  );
};

export default AdminVenuesPage;
