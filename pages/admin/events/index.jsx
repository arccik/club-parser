import TableScrollArea from "../../../src/components/AdminPage/TableScrollArea/TableScrollArea";
import { useGetEventsQuery } from "../../../src/features/event/eventSlice";
import { Container, ActionIcon, TextInput, Pagination } from "@mantine/core";
import { IconPlus } from "@tabler/icons";
import styles from "../../../src/styles/Home.module.css";
import Link from "next/link";
import Loading from "../../../src/utils/Loading/Loading";
import { useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import ErrorPage from "next/error";

const AdminEventsPage = () => {
  const [activePage, setPage] = useState(1);
  const { data, isLoading, error } = useGetEventsQuery(activePage);
  const { user } = useUser();

  const [filteredData, setFilteredData] = useState(null);
  const handleSearch = ({ target }) => {
    if (target.value === "") setFilteredData(null);
    setFilteredData(
      data.events.filter((value) =>
        value.name.toLowerCase().includes(target.value.toLowerCase())
      )
    );
  };
  if (isLoading) return <Loading />;
  if (!user) return <ErrorPage statusCode={404} />;
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
      <TableScrollArea data={filteredData || data.events} />
      <Pagination
        position="center"
        mt="lg"
        styles={(theme) => ({
          item: {
            "&[data-active]": {
              backgroundImage: theme.fn.gradient({
                from: "red",
                to: "yellow",
              }),
            },
          },
        })}
        page={activePage}
        onChange={setPage}
        total={data.numberOfPages}
      />
    </Container>
  );
};

export default AdminEventsPage;
