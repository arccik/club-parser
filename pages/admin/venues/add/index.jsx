import { Container, Button, Grid, ActionIcon } from "@mantine/core";
import { IconPlus } from "@tabler/icons";
import AddVenue from "../../../../src/components/AdminPage/AddVenue/AddVenue";
import ErrorPage from "next/error";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import Loading from "../../../../src/utils/Loading/Loading";

const AddVenuePage = () => {
  const { user, isLoading } = useUser();
  if (user?.role !== "admin") return null;
  if (isLoading) return <Loading />;
  if (!user) return <ErrorPage statusCode={404} />;
  return (
    <Container size={"100%"}>
      <AddVenue />
    </Container>
  );
};

export default withPageAuthRequired(AddVenuePage);
