import TableScrollArea from "../../../src/components/AdminPage/TableScrollArea/TableScrollArea";
import { useState } from "react";
import { Container, ActionIcon, TextInput, Pagination } from "@mantine/core";
import { IconPlus } from "@tabler/icons";
import styles from "../../../src/styles/Home.module.css";
import Link from "next/link";
import Loading from "../../../src/utils/Loading/Loading";
import { useGetVenuesQuery } from "../../../src/features/venue/venueSlice";
import { useUser } from "@auth0/nextjs-auth0/client";
import ErrorPage from "next/error";

const AdminVenuesPage = () => {
  const [activePage, setPage] = useState(1);
  const { user } = useUser();
  const { data, isLoading, error } = useGetVenuesQuery(activePage);
  if (!user) return <ErrorPage statusCode={404} />;
  if (isLoading) return <Loading />;
  return (
    <>
      <Container size={"100%"} px={0}>
        <ActionIcon
          component={Link}
          title="Add new Event"
          href="/admin/venues/add"
          className={styles.floationAddItemButton}
        >
          <IconPlus />
        </ActionIcon>

        <TableScrollArea data={data.venues} type="venues" />
      </Container>
      <Pagination
        position="center"
        mt="lg"
        size="xs"
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
    </>
  );
};

export default AdminVenuesPage;
